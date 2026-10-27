import type { User } from '@audiophile/shared';

import { ConflictError } from '@/helpers/app-error';
import { toAuthRegisterInput } from '@/helpers/auth';
import { getHash } from '@/helpers/password';
import {
  createAccessToken,
  createRefreshToken,
  getRefreshTokenExpirationDate,
} from '@/helpers/tokens';
import type {
  UserRepository,
  RefreshTokenRepository,
} from '@/repositories/types';

type RegisterUseCaseParams = {
  input: unknown;
};

type RegisterUseCaseResult = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({
    input,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResult> {
    const { name, email, password } = toAuthRegisterInput(input);

    const foundUserWithEmail = await this.userRepository.findByEmail({
      email,
    });

    if (foundUserWithEmail) {
      throw new ConflictError();
    }

    const passwordHash = await getHash(password);

    const createdUser = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const accessToken = createAccessToken({
      userId: createdUser.id,
      userEmail: email,
    });

    const refreshToken = createRefreshToken();

    await this.refreshTokenRepository.create({
      token: refreshToken,
      userId: createdUser.id,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    return {
      user: createdUser,
      accessToken,
      refreshToken,
    };
  }
}
