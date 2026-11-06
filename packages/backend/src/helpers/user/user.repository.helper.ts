import { DrizzleUserRepository } from '@/repositories/drizzle';
import { InMemoryUserRepository } from '@/repositories/in-memory';
import type { UserRepository } from '@/repositories/types';

import {
  DEFAULT_REPOSITORY_TYPE,
  type RepositoryType,
} from '../common/repository';

export function makeUserRepository(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<RepositoryType, UserRepository> = {
    drizzle: new DrizzleUserRepository(),
    'in-memory': new InMemoryUserRepository(),
  };

  return repositories[type];
}
