import {
  LoginUseCase,
  RefreshUseCase,
  RegisterUseCase,
} from '@/use-cases/auth';

import type { RepositoryType } from '../common/types';
import { makeRefreshTokenRepository } from '../refresh-token/make-refresh-token-repository';
import { makeUserRepository } from '../user/make-user-repository';

export function makeRegisterUseCase(type: RepositoryType = 'drizzle') {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new RegisterUseCase(userRepository, refreshTokenRepository),
  };
}

export function makeLoginUseCase(type: RepositoryType = 'drizzle') {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new LoginUseCase(userRepository, refreshTokenRepository),
  };
}

export function makeRefreshUseCase(type: RepositoryType = 'drizzle') {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new RefreshUseCase(userRepository, refreshTokenRepository),
  };
}
