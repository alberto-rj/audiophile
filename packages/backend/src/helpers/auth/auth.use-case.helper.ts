import {
  LoginUseCase,
  RefreshUseCase,
  RegisterUseCase,
} from '@/use-cases/auth';

import {
  DEFAULT_REPOSITORY_TYPE,
  type RepositoryType,
} from '../common/repository';
import { makeRefreshTokenRepository } from '../refresh-token/refresh-token.repository.helper';
import { makeUserRepository } from '../user/user.repository.helper';

export function makeRegisterUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new RegisterUseCase(userRepository, refreshTokenRepository),
  };
}

export function makeLoginUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new LoginUseCase(userRepository, refreshTokenRepository),
  };
}

export function makeRefreshUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return {
    userRepository,
    refreshTokenRepository,
    useCase: new RefreshUseCase(userRepository, refreshTokenRepository),
  };
}
