import type { User } from '@audiophile/shared';

import { UnauthorizedError } from '@/helpers/app-error';
import { toRefreshTokenTokenInput } from '@/helpers/auth';
import {
  createAccessToken,
  createRefreshToken,
  getRefreshTokenExpirationDate,
} from '@/helpers/tokens';
import type {
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories/types';

interface RefreshUseCaseParams {
  input: unknown;
}

interface RefreshUseCaseResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class RefreshUseCase {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({
    input,
  }: RefreshUseCaseParams): Promise<RefreshUseCaseResult> {
    const { token } = toRefreshTokenTokenInput(input);

    const foundToken = await this.refreshTokenRepository.find({
      token,
    });
    if (!foundToken) {
      throw new UnauthorizedError();
    }

    const isRefreshTokenExpired = new Date() > new Date(foundToken.expiresAt);
    if (isRefreshTokenExpired) {
      await this.refreshTokenRepository.delete({ token });
      throw new UnauthorizedError();
    }

    const foundUser = await this.userRepository.findById({
      id: foundToken.userId,
    });
    if (!foundUser) {
      throw new UnauthorizedError();
    }

    await this.refreshTokenRepository.delete({ token });

    const newAccessToken = createAccessToken({
      userId: foundUser.id,
      userEmail: foundUser.email,
    });
    const newRefreshToken = createRefreshToken();

    await this.refreshTokenRepository.create({
      token: newRefreshToken,
      userId: foundUser.id,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    return {
      user: foundUser,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
