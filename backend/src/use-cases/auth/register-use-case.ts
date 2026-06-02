import { refreshTokenRepository, userRepository } from '@/config';
import {
  ConflictError,
  getAccessToken,
  getHash,
  getRefreshToken,
  makeRegisterPresenter,
  refreshTokenExpiresAt,
  toSafeUser,
} from '@/helpers';
import type { UserCreateParams } from '@/repositories';
import { type SafeUser } from '@/schemas';

interface RegisterUseCaseParams {
  payload: UserCreateParams;
}

interface RegisterUseCaseResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

export async function registerUseCase({
  payload,
}: RegisterUseCaseParams): Promise<RegisterUseCaseResult> {
  const { name, email, password } = makeRegisterPresenter(payload);

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
    user: toSafeUser(createdUser),
    accessToken,
    refreshToken,
  };
}
