import type { User } from '@audiophile/shared';

import { refreshTokenRepository, userRepository } from '@/config/repositories';
import { UnauthorizedError } from '@/helpers/app-error';
import { toRefreshTokenTokenInput } from '@/helpers/auth';
import {
  getAccessToken,
  getRefreshToken,
  refreshTokenExpiresAt,
} from '@/helpers/tokens';

interface RefreshUseCaseParams {
  input: unknown;
}

interface RefreshUseCaseResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function refreshUseCase({
  input,
}: RefreshUseCaseParams): Promise<RefreshUseCaseResult> {
  const { token } = toRefreshTokenTokenInput(input);

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
    user: foundUser,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
