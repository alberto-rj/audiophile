import { refreshTokenRepository, userRepository } from '@/config';
import {
  getAccessToken,
  getRefreshToken,
  hasCorrectHash,
  makeLoginPresenter,
  refreshTokenExpiresAt,
  toSafeUser,
  UnauthorizedError,
} from '@/helpers';
import { type ApiLoginBody, type SafeUser } from '@/schemas';

interface LoginUseCaseParams {
  payload: ApiLoginBody;
}

interface LoginUseCaseResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

export async function loginUseCase({
  payload,
}: LoginUseCaseParams): Promise<LoginUseCaseResult> {
  const { email, password } = makeLoginPresenter(payload);

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

  const refreshToken = getRefreshToken({
    userId: foundUserWithEmail.id,
    userEmail: email,
  });

  await refreshTokenRepository.create({
    token: refreshToken,
    userId: foundUserWithEmail.id,
    expiresAt: refreshTokenExpiresAt(),
  });

  return {
    user: toSafeUser(foundUserWithEmail),
    accessToken,
    refreshToken,
  };
}
