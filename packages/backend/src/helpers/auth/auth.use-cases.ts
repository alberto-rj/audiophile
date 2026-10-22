import { RegisterUseCase } from '@/use-cases';

import type { RepositoryType } from '../common/types';
import { makeRefreshTokenRepository } from '../refresh-token/make-refresh-token-repository';
import { makeUserRepository } from '../user/make-user-repository';

export function makeRegisterUseCase(type: RepositoryType = 'drizzle') {
  const userRepository = makeUserRepository(type);
  const refreshTokenRepository = makeRefreshTokenRepository(type);

  return new RegisterUseCase(userRepository, refreshTokenRepository);
}
