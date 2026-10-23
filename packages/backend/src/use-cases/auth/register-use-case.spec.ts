import { makeAuthRegisterInput } from '@audiophile/shared';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ConflictError, ValidationError } from '@/helpers/app-error';
import { makeRegisterUseCase } from '@/helpers/auth';
import { hasCorrectHash } from '@/helpers/password';

import { RegisterUseCase } from './register-use-case';

describe('[use case] auth / register', () => {
  let sut: RegisterUseCase;
  let input: ReturnType<typeof makeAuthRegisterInput>;

  beforeEach(() => {
    sut = makeRegisterUseCase('in-memory');
    input = makeAuthRegisterInput();
  });

  afterEach(async () => {
    await sut.getRefreshTokenRepository().clear();
    await sut.getUserRepository().clear();
  });

  it('should persist an user successfully after registration', async () => {
    const result = await sut.execute({ input });

    const persistedUser = await sut.getUserRepository().findByEmail({
      email: input.email,
    });

    expect(persistedUser).not.toBeNull();
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(
      expect.objectContaining({
        name: persistedUser!.name,
        email: persistedUser!.email,
        password: persistedUser!.password,
        createdAt: persistedUser!.createdAt,
      }),
    );
  });

  it('should persist an user with a hashed password after registration', async () => {
    await sut.execute({ input });

    const persistedUser = await sut.getUserRepository().findByEmail({
      email: input.email,
    });

    expect(persistedUser).not.toBeNull();
    expect(persistedUser).toHaveProperty('password');
    await expect(
      hasCorrectHash(input.password, persistedUser!.password),
    ).resolves.toBe(true);
  });

  it('should return an user with access token and refresh token after registration', async () => {
    const result = await sut.execute({ input });

    expect(result).not.toBeNull();
    expect(result).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });

  it('should persist an user refresh token after registration', async () => {
    const { refreshToken } = await sut.execute({ input });

    const persistedRefreshToken = await sut.getRefreshTokenRepository().find({
      token: refreshToken,
    });

    const persistedUser = await sut.getUserRepository().findByEmail({
      email: input.email,
    });

    expect(persistedUser).not.toBeNull();
    expect(persistedRefreshToken).not.toBeNull();
    expect(persistedRefreshToken).toEqual(
      expect.objectContaining({ userId: persistedUser?.id }),
    );
  });

  it('should not allow user registration with an existing email', async () => {
    await sut.execute({ input });

    await expect(() => sut.execute({ input })).rejects.toBeInstanceOf(
      ConflictError,
    );
  });

  it('should not allow user registration with invalid name, email or password', async () => {
    const invalidInput = makeAuthRegisterInput({
      name: {
        isInvalid: true,
      },
      email: {
        isInvalid: true,
      },
      password: {
        isInvalid: true,
      },
    });

    await expect(() =>
      sut.execute({ input: invalidInput }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
