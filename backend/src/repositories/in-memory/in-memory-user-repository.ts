import { makeUser } from '@/helpers';
import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserId,
  UserUpdateParams,
} from '@/schemas';

import type { UserRepository } from '../types/user-repository.types';

export class InMemoryUserRepository implements UserRepository {
  private items: Map<UserId, User>;

  constructor() {
    this.items = new Map();
  }

  async create(params: UserCreateParams) {
    const newItem = makeUser(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async findById({ id }: UserFindByIdParams) {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findByEmail({ email }: UserFindByEmailParams) {
    for (const [, user] of this.items.entries()) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }

  async update({ id, ...changes }: UserUpdateParams) {
    const foundItem = this.items.get(id);

    if (!foundItem) {
      return null;
    }

    const updateItem = {
      ...foundItem,
      ...changes,
    };

    this.items.set(id, updateItem);

    return updateItem;
  }

  async clear() {
    this.items.clear();
  }
}
