import { makeAuthRegisterInput } from '@audiophile/shared';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UnauthorizedError, ValidationError } from '@/helpers/app-error';
import { makeRefreshUseCase } from '@/helpers/auth';
import { getHash } from '@/helpers/password';
import {
  getAccessTokenPayload,
  createRefreshToken,
  getRefreshTokenExpirationDate,
} from '@/helpers/tokens';
import type {
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories/types';

import { RefreshUseCase } from './refresh.use-case';

async function makePreRefresh(
  userRepo: UserRepository,
  refreshTokenRepo: RefreshTokenRepository,
  expiresAt: Date = getRefreshTokenExpirationDate(),
) {
  const { name, email, password } = makeAuthRegisterInput();

  const hashedPassword = await getHash(password);
  const persistedUser = await userRepo.create({
    name,
    email,
    password: hashedPassword,
  });

  const newRefreshToken = createRefreshToken();
  const persistedRefreshToken = await refreshTokenRepo.create({
    token: newRefreshToken,
    userId: persistedUser.id,
    expiresAt,
  });
  const input = {
    token: persistedRefreshToken.token,
  };

  return {
    persistedUser,
    persistedRefreshToken,
    input,
  };
}

describe('[use case] auth / refresh', () => {
  let sut: RefreshUseCase;
  let userRepo: UserRepository;
  let refreshTokenRepo: RefreshTokenRepository;

  beforeEach(() => {
    const { useCase, userRepository, refreshTokenRepository } =
      makeRefreshUseCase('in-memory');
    userRepo = userRepository;
    refreshTokenRepo = refreshTokenRepository;
    sut = useCase;
  });

  afterEach(async () => {
    await refreshTokenRepo.clear();
    await userRepo.clear();
  });

  it('should generate a new refresh token for the logged user', async () => {
    const { input, persistedRefreshToken, persistedUser } =
      await makePreRefresh(userRepo, refreshTokenRepo);

    const { refreshToken: updatedToken, user } = await sut.execute({
      input: input,
    });

    expect(updatedToken).not.toBe(persistedRefreshToken.token);
    await expect(
      refreshTokenRepo.find({
        token: updatedToken,
      }),
    ).resolves.toMatchObject({
      userId: persistedUser.id,
    });

    expect(user.id).toBe(persistedUser.id);
  });

  it('should generate a new access token for the logged user', async () => {
    const { input, persistedUser } = await makePreRefresh(
      userRepo,
      refreshTokenRepo,
    );

    const { accessToken: updatedAccessToken } = await sut.execute({
      input,
    });

    expect(getAccessTokenPayload(updatedAccessToken)).toMatchObject({
      userId: persistedUser.id,
      userEmail: persistedUser.email,
    });
  });

  it('should not persist the old refresh token after generating a new one', async () => {
    const {
      input,
      persistedRefreshToken: oldRefreshToken,
      persistedUser,
    } = await makePreRefresh(userRepo, refreshTokenRepo);

    await sut.execute({
      input,
    });

    await expect(
      refreshTokenRepo.find({
        token: oldRefreshToken.token,
      }),
    ).resolves.toBeNull();

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(1);
  });

  it('should reject token generation when the refresh token does not exist', async () => {
    const { persistedRefreshToken, persistedUser } = await makePreRefresh(
      userRepo,
      refreshTokenRepo,
    );

    const token = createRefreshToken();
    await expect(
      sut.execute({
        input: {
          token,
        },
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);

    await expect(
      refreshTokenRepo.find({
        token: persistedRefreshToken.token,
      }),
    ).resolves.toMatchObject(persistedRefreshToken);

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(1);
  });

  it('should reject when the refresh token belongs to a user that does not exist', async () => {
    const token = createRefreshToken();
    await refreshTokenRepo.create({
      token,
      userId: 999_999,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    await expect(sut.execute({ input: { token } })).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
  });

  it('should reject when the refresh token is expired', async () => {
    const expiredDate = new Date(Date.now() - 60 * 1000);
    const { input, persistedUser, persistedRefreshToken } =
      await makePreRefresh(userRepo, refreshTokenRepo, expiredDate);

    await expect(
      sut.execute({
        input,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);

    await expect(
      refreshTokenRepo.find({
        token: persistedRefreshToken.token,
      }),
    ).resolves.toBeNull();

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(0);
  });

  it('should reject when refresh token is invalid', async () => {
    const { persistedUser } = await makePreRefresh(userRepo, refreshTokenRepo);

    const invalidInput = {
      token: undefined,
    };

    await expect(sut.execute({ input: invalidInput })).rejects.toBeInstanceOf(
      ValidationError,
    );

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(1);
  });
});
