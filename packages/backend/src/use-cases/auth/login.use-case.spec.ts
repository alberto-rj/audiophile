import { makeAuthLoginInput, makeAuthRegisterInput } from '@audiophile/shared';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UnauthorizedError, ValidationError } from '@/helpers/app-error';
import { makeLoginUseCase } from '@/helpers/auth';
import { getHash } from '@/helpers/password';
import { getAccessTokenPayload } from '@/helpers/tokens';
import type {
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories/types';

import { LoginUseCase } from './login.use-case';

async function makePreLogin(userRepo: UserRepository) {
  const { name, email, password } = makeAuthRegisterInput();

  const hashedPassword = await getHash(password);
  const persistedUser = await userRepo.create({
    name,
    email,
    password: hashedPassword,
  });

  const credentials = {
    email,
    password,
  };

  return {
    persistedUser,
    credentials,
  };
}

describe('[use case] auth / login', () => {
  let sut: LoginUseCase;
  let userRepo: UserRepository;
  let refreshTokenRepo: RefreshTokenRepository;

  beforeEach(() => {
    const { useCase, userRepository, refreshTokenRepository } =
      makeLoginUseCase('in-memory');
    userRepo = userRepository;
    refreshTokenRepo = refreshTokenRepository;
    sut = useCase;
  });

  afterEach(async () => {
    await refreshTokenRepo.clear();
    await userRepo.clear();
  });

  it('should authenticate a user successfully', async () => {
    const { credentials, persistedUser } = await makePreLogin(userRepo);

    const { user: loggedUser } = await sut.execute({
      input: credentials,
    });

    expect(loggedUser).toMatchObject({
      id: persistedUser.id,
      email: credentials.email,
    });
  });

  it('should return an access token that identifies the logged user', async () => {
    const { persistedUser, credentials } = await makePreLogin(userRepo);

    const { accessToken } = await sut.execute({
      input: credentials,
    });

    expect(getAccessTokenPayload(accessToken)).toMatchObject({
      userId: persistedUser.id,
      userEmail: credentials.email,
    });
  });

  it('should persist the returned refresh token for the logged user', async () => {
    const { persistedUser, credentials } = await makePreLogin(userRepo);

    const { refreshToken } = await sut.execute({
      input: credentials,
    });

    const persistedRefreshToken = await refreshTokenRepo.find({
      token: refreshToken,
    });
    expect(persistedRefreshToken).toMatchObject({
      token: refreshToken,
      userId: persistedUser.id,
    });

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(1);
  });

  it('should reject authentication when email is incorrect', async () => {
    const { persistedUser, credentials } = await makePreLogin(userRepo);

    await expect(() =>
      sut.execute({
        input: {
          email: 'incorrect_email@example.com',
          password: credentials.password,
        },
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(0);
  });

  it('should reject authentication when password is incorrect', async () => {
    const { persistedUser, credentials } = await makePreLogin(userRepo);

    await expect(() =>
      sut.execute({
        input: {
          email: credentials.email,
          password: 'Incorrect_Password#@1234',
        },
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(0);
  });

  it.each(['email', 'password'] as const)(
    'should reject authentication when %s is invalid',
    async (field) => {
      const { persistedUser } = await makePreLogin(userRepo);

      const invalidInput = makeAuthLoginInput({
        [field]: {
          isInvalid: true,
        },
      });

      await expect(() =>
        sut.execute({ input: invalidInput }),
      ).rejects.toBeInstanceOf(ValidationError);

      const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
        limit: 20,
        page: 1,
        userId: persistedUser.id,
      });
      expect(refreshTokenPaginationResult.items).toHaveLength(0);
    },
  );
});
