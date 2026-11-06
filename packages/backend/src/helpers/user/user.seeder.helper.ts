import { UserSeeder } from '@/db/seeds/user';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeUserRepository } from './user.repository.helper';

export function makeUserSeeder(type: RepositoryType = DEFAULT_REPOSITORY_TYPE) {
  const userRepository = makeUserRepository(type);

  return {
    seeder: new UserSeeder(userRepository),
    userRepository,
  };
}
