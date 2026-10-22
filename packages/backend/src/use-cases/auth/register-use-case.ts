import type { User } from '@audiophile/shared';

import {
  ConflictError,
  getAccessToken,
  getHash,
  getRefreshToken,
  toAuthRegisterInput,
  refreshTokenExpiresAt,
} from '@/helpers';
import type { RefreshTokenRepository, UserRepository } from '@/repositories';

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

    const accessToken = getAccessToken({
      userId: createdUser.id,
      userEmail: email,
    });

    const refreshToken = getRefreshToken();

    await this.refreshTokenRepository.create({
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

  getUserRepository() {
    return this.userRepository;
  }

  getRefreshTokenRepository() {
    return this.refreshTokenRepository;
  }
}
