import type { User, UserCreateParams } from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import { getHash } from '@/helpers/password';
import type { UserRepository } from '@/repositories/types';

import type { UserSeed } from './user.seeds';

type RunParams = {
  users: UserSeed[];
};

export class UserSeeder {
  constructor(private userRepository: UserRepository) {}

  async run({ users }: RunParams): Promise<User[]> {
    const paramsList: UserCreateParams[] = [];

    for (const { name, email, password } of users) {
      paramsList.push({
        name,
        email,
        password: await getHash(password),
      });
    }

    const createdUsers = await this.userRepository.createMany(paramsList);

    return createdUsers;
  }

  async safeRun({ users }: RunParams): Promise<User[]> {
    try {
      logger.info('Seeding "users"...');
      const createdUsers = await this.run({ users });
      logger.info('"users" was successfully seeded.');
      return createdUsers;
    } catch (error) {
      logger.error('Failed to seed "users".', error);
      process.exit(1);
    }
  }
}
