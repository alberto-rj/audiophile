import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserFindManyParams,
  UserUpdateParams,
} from '@audiophile/shared';

import { db } from '@/db/in-memory';
import { makeUser } from '@/helpers/user';
import { paginate, type PaginateResult } from '@/helpers/paginate';

import type { UserRepository } from '../types/user-repository.types';

export class InMemoryUserRepository implements UserRepository {
  async create(params: UserCreateParams): Promise<User> {
    const createdUser = makeUser(params);

    db.users.set(createdUser.id, createdUser);

    return createdUser;
  }

  async createMany(params: UserCreateParams[]): Promise<User[]> {
    const createdUsers = params.map(makeUser);

    for (const createdUser of createdUsers) {
      db.users.set(createdUser.id, createdUser);
    }

    return createdUsers;
  }

  async findById({ id }: UserFindByIdParams): Promise<User | null> {
    const foundUsers = db.users.get(id);

    if (!foundUsers) {
      return null;
    }

    return foundUsers;
  }

  async findByEmail({ email }: UserFindByEmailParams): Promise<User | null> {
    const foundUsers = Array.from(db.users.values()).find(
      (item) => item.email === email,
    );

    if (!foundUsers) {
      return null;
    }

    return foundUsers;
  }

  async findMany({
    limit,
    page,
  }: UserFindManyParams): Promise<PaginateResult<User>> {
    const userItems = Array.from(db.users.values());
    const foundUsers = paginate({ items: userItems, limit, page });

    return foundUsers;
  }

  async update({ id, ...changes }: UserUpdateParams): Promise<User | null> {
    const foundUsers = db.users.get(id);

    if (!foundUsers) {
      return null;
    }

    const updateItem = {
      ...foundUsers,
      ...changes,
    };

    db.users.set(id, updateItem);

    return updateItem;
  }

  async clear(): Promise<void> {
    db.users.clear();
  }
}
