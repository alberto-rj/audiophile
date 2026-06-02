import { refreshTokenRepository, userRepository } from '@/config';
import {
  getAccessToken,
  getRefreshToken,
  refreshTokenExpiresAt,
  toSafeUser,
  UnauthorizedError,
} from '@/helpers';
import type { RefreshTokenFindParams } from '@/repositories';
import type { SafeUser } from '@/schemas';

interface RefreshUseCaseParams {
  payload: RefreshTokenFindParams;
}

interface RefreshUseCaseResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

export async function refreshUseCase({
  payload,
}: RefreshUseCaseParams): Promise<RefreshUseCaseResult> {
  const { token } = payload;

  const foundToken = await refreshTokenRepository.find({
    token,
  });

  if (!foundToken) {
    throw new UnauthorizedError();
  }

  if (new Date() > new Date(foundToken.expiresAt)) {
    await refreshTokenRepository.delete({ token });
    throw new UnauthorizedError();
  }

  const foundUser = await userRepository.findById({ id: foundToken.userId });

  if (!foundUser) {
    throw new UnauthorizedError();
  }

  await refreshTokenRepository.delete({ token });

  const newAccessToken = getAccessToken({
    userId: foundUser.id,
    userEmail: foundUser.email,
  });
  const newRefreshToken = getRefreshToken();

  await refreshTokenRepository.create({
    token: newRefreshToken,
    userId: foundUser.id,
    expiresAt: refreshTokenExpiresAt(),
  });

  return {
    user: toSafeUser(foundUser),
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
