import { db } from '@/db/in-memory';
import { makeUser } from '@/helpers';
import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserUpdateParams,
} from '@/schemas';

import type { UserRepository } from '../types/user-repository.types';

export class InMemoryUserRepository implements UserRepository {
  async create(params: UserCreateParams): Promise<User> {
    const newItem = makeUser(params);

    db.users.set(newItem.id, newItem);

    return newItem;
  }

  async findById({ id }: UserFindByIdParams): Promise<User | null> {
    const foundItem = db.users.get(id);

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findByEmail({ email }: UserFindByEmailParams): Promise<User | null> {
    const foundItem = Array.from(db.users.values()).find(
      (item) => item.email === email,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async update({ id, ...changes }: UserUpdateParams): Promise<User | null> {
    const foundItem = db.users.get(id);

    if (!foundItem) {
      return null;
    }

    const updateItem = {
      ...foundItem,
      ...changes,
    };

    db.users.set(id, updateItem);

    return updateItem;
  }

  async clear(): Promise<void> {
    db.users.clear();
  }
}
