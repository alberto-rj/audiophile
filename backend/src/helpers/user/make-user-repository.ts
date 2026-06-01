import { InMemoryUserRepository, type UserRepository } from '@/repositories';

type UserRepositoryType = 'pg' | 'in-memory' | 'default';

export function makeUserRepository(type: UserRepositoryType = 'default') {
  const repositories: Record<UserRepositoryType, UserRepository> = {
    'in-memory': new InMemoryUserRepository(),
    pg: new InMemoryUserRepository(),
    default: new InMemoryUserRepository(),
  };

  return repositories[type];
}
