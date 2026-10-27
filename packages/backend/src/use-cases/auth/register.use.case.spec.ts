import { makeAuthRegisterInput } from '@audiophile/shared';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ConflictError, ValidationError } from '@/helpers/app-error';
import { makeRegisterUseCase } from '@/helpers/auth';
import { hasCorrectHash } from '@/helpers/password';
import { getAccessTokenPayload } from '@/helpers/tokens';
import type {
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories/types';

import { RegisterUseCase } from './register.use-case';

describe('[use case] auth / register', () => {
  let sut: RegisterUseCase;
  let userRepo: UserRepository;
  let refreshTokenRepo: RefreshTokenRepository;
  let input: ReturnType<typeof makeAuthRegisterInput>;

  beforeEach(() => {
    const { useCase, userRepository, refreshTokenRepository } =
      makeRegisterUseCase('in-memory');
    userRepo = userRepository;
    refreshTokenRepo = refreshTokenRepository;
    sut = useCase;
    input = makeAuthRegisterInput();
  });

  afterEach(async () => {
    await refreshTokenRepo.clear();
    await userRepo.clear();
  });

  it('should persist a user successfully after registration', async () => {
    const result = await sut.execute({ input });

    const persistedUser = await userRepo.findByEmail({
      email: input.email,
    });

    expect(result.user).toMatchObject({
      name: input.name,
      email: input.email,
    });
    expect(persistedUser).toMatchObject({
      name: input.name,
      email: input.email,
    });
  });

  it('should persist a user with a hashed password after registration', async () => {
    await sut.execute({ input });

    const persistedUser = await userRepo.findByEmail({
      email: input.email,
    });

    expect(persistedUser).not.toBeNull();
    await expect(
      hasCorrectHash(input.password, persistedUser!.password),
    ).resolves.toBe(true);
  });

  it('should return an access token that identifies the registered user', async () => {
    const { accessToken } = await sut.execute({ input });

    const persistedUser = await userRepo.findByEmail({ email: input.email });
    expect(persistedUser).not.toBeNull();

    expect(getAccessTokenPayload(accessToken)).toMatchObject({
      userId: persistedUser!.id,
      userEmail: input.email,
    });
  });

  it('should persist the returned refresh token for the registered user', async () => {
    const { refreshToken } = await sut.execute({ input });

    const persistedUser = await userRepo.findByEmail({ email: input.email });
    expect(persistedUser).not.toBeNull();

    const persistedRefreshToken = await refreshTokenRepo.find({
      token: refreshToken,
    });
    expect(persistedRefreshToken).toMatchObject({
      token: refreshToken,
      userId: persistedUser!.id,
    });

    const refreshTokenPaginationResult = await refreshTokenRepo.findMany({
      limit: 20,
      page: 1,
      userId: persistedUser!.id,
    });
    expect(refreshTokenPaginationResult.items).toHaveLength(1);
  });

  it('should reject registration with an existing email', async () => {
    await sut.execute({ input });

    await expect(() => sut.execute({ input })).rejects.toBeInstanceOf(
      ConflictError,
    );

    const userPaginationResult = await userRepo.findMany({
      limit: 20,
      page: 1,
    });
    expect(userPaginationResult.items).toHaveLength(1);
  });

  it.each(['name', 'email', 'password'] as const)(
    'should reject registration when %s is invalid',
    async (field) => {
      const invalidInput = makeAuthRegisterInput({
        [field]: {
          isInvalid: true,
        },
      });

      await expect(() =>
        sut.execute({ input: invalidInput }),
      ).rejects.toBeInstanceOf(ValidationError);

      const userPaginationResult = await userRepo.findMany({
        limit: 20,
        page: 1,
      });
      expect(userPaginationResult.items).toHaveLength(0);
    },
  );
});
