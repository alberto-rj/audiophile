import {
  DrizzleUserRepository,
  InMemoryUserRepository,
  type UserRepository,
} from '@/repositories';

type UserRepositoryType = 'pg' | 'in-memory';

export function makeUserRepository(type: UserRepositoryType = 'pg') {
  const repositories: Record<UserRepositoryType, UserRepository> = {
    'in-memory': new InMemoryUserRepository(),
    pg: new DrizzleUserRepository(),
  };

  return repositories[type];
}
