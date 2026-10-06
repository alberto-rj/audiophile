import { refreshTokenRepository, userRepository } from '@/config';
import {
  getAccessToken,
  getRefreshToken,
  hasCorrectHash,
  toAuthLoginInput,
  refreshTokenExpiresAt,
  UnauthorizedError,
} from '@/helpers';
import type { User } from '@audiophile/shared';

interface LoginUseCaseParams {
  input: unknown;
}

interface LoginUseCaseResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function loginUseCase({
  input,
}: LoginUseCaseParams): Promise<LoginUseCaseResult> {
  const { email, password } = toAuthLoginInput(input);

  const foundUserWithEmail = await userRepository.findByEmail({
    email,
  });

  if (!foundUserWithEmail) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  const hasCorrectPassword = await hasCorrectHash(
    password,
    foundUserWithEmail.password,
  );

  if (!hasCorrectPassword) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  const accessToken = getAccessToken({
    userId: foundUserWithEmail.id,
    userEmail: email,
  });

  const refreshToken = getRefreshToken();

  await refreshTokenRepository.create({
    token: refreshToken,
    userId: foundUserWithEmail.id,
    expiresAt: refreshTokenExpiresAt(),
  });

  return {
    user: foundUserWithEmail,
    accessToken,
    refreshToken,
  };
}
