import { refreshTokenRepository, userRepository } from '@/config';
import {
  ConflictError,
  getAccessToken,
  getHash,
  getRefreshToken,
  toAuthRegisterInput,
  refreshTokenExpiresAt,
} from '@/helpers';
import type { User } from '@/schemas';

interface RegisterUseCaseParams {
  input: unknown;
}

interface RegisterUseCaseResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function registerUseCase({
  input,
}: RegisterUseCaseParams): Promise<RegisterUseCaseResult> {
  const { name, email, password } = toAuthRegisterInput(input);

  const foundUserWithEmail = await userRepository.findByEmail({
    email,
  });

  if (foundUserWithEmail) {
    throw new ConflictError();
  }

  const passwordHash = await getHash(password);

  const createdUser = await userRepository.create({
    name,
    email,
    password: passwordHash,
  });

  const accessToken = getAccessToken({
    userId: createdUser.id,
    userEmail: email,
  });

  const refreshToken = getRefreshToken();

  await refreshTokenRepository.create({
    token: refreshToken,
    userId: createdUser.id,
    expiresAt: refreshTokenExpiresAt(),
  });

  return {
    user: createdUser,
    accessToken,
    refreshToken,
  };
}
