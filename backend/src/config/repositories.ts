import { makeRefreshTokenRepository, makeUserRepository } from '@/helpers';
import type { RefreshTokenRepository, UserRepository } from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();
