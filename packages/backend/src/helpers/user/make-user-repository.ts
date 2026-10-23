import { DrizzleUserRepository } from '@/repositories/drizzle';
import { InMemoryUserRepository } from '@/repositories/in-memory';
import type { UserRepository } from '@/repositories/types';

import type { RepositoryType } from '../common/types';

export function makeUserRepository(type: RepositoryType = 'drizzle') {
  const repositories: Record<RepositoryType, UserRepository> = {
    drizzle: new DrizzleUserRepository(),
    'in-memory': new InMemoryUserRepository(),
  };

  return repositories[type];
}
