import { makeUser } from '@/helpers';
import type { User } from '@/schemas';

import type {
  UserCreateParams,
  UserFindByIdParams,
  UserFindByEmailParams,
  UserRepository,
} from '../user-repository.types';

export class InMemoryUserRepository implements UserRepository {
  private items: Map<number, User>;

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

  async clear() {
    this.items.clear();
  }
}
