import { UserSeeder, userSeeds } from '@/db/seeds/user';

import {
  DEFAULT_REPOSITORY_TYPE,
  type RepositoryType,
} from '../common/repository';

import { makeUserRepository } from './user.repository.helper';

export function makeUserSeeder(type: RepositoryType = DEFAULT_REPOSITORY_TYPE) {
  const userRepository = makeUserRepository(type);

  return {
    seeder: new UserSeeder(userRepository),
    userRepository,
  };
}

export async function seedUsers(repositoryType: RepositoryType) {
  const { seeder: userSeeder } = makeUserSeeder(repositoryType);
  const persistedUsers = await userSeeder.run({ users: userSeeds });

  return { users: persistedUsers };
}
