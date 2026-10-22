import {
  DrizzleUserRepository,
  InMemoryUserRepository,
  type UserRepository,
} from '@/repositories';

import type { RepositoryType } from '../common/types';

export function makeUserRepository(type: RepositoryType = 'drizzle') {
  const repositories: Record<RepositoryType, UserRepository> = {
    'in-memory': new InMemoryUserRepository(),
    drizzle: new DrizzleUserRepository(),
  };

  return repositories[type];
}
