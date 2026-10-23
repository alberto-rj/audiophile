import { userRepository } from '@/config/repositories';
import { type User } from '@/db/mocks';

import { logger } from '@/helpers/logger';
import { getHash } from '@/helpers/password';

type CreateUsersParams = {
  users: User[];
};

export async function createUsers({ users }: CreateUsersParams) {
  const newParamsList: User[] = [];

  for (const { name, email, password } of users) {
    newParamsList.push({
      name,
      email,
      password: await getHash(password),
    });
  }

  const createdUsers = await userRepository.createMany(newParamsList);

  return createdUsers;
}

export async function seedUsers({ users }: CreateUsersParams) {
  try {
    logger.info('Seeding "users"...');
    const createdUsers = await createUsers({ users });
    logger.info('"users" was successfully seeded.');
    return createdUsers;
  } catch (error) {
    logger.error('Failed to seed "users".', error);
    process.exit(1);
  }
}
