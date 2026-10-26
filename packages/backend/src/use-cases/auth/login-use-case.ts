import type { User } from '@audiophile/shared';

import { UnauthorizedError } from '@/helpers/app-error';
import { toAuthLoginInput } from '@/helpers/auth';
import { hasCorrectHash } from '@/helpers/password';
import {
  getAccessToken,
  getRefreshToken,
  refreshTokenExpiresAt,
} from '@/helpers/tokens';
import type {
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories/types';

interface LoginUseCaseParams {
  input: unknown;
}

interface LoginUseCaseResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({ input }: LoginUseCaseParams): Promise<LoginUseCaseResult> {
    const { email, password } = toAuthLoginInput(input);

    const foundUserWithEmail = await this.userRepository.findByEmail({
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

    await this.refreshTokenRepository.create({
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
}
