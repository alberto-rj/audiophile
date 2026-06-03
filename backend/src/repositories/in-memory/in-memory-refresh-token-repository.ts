import { makeRefreshToken } from '@/helpers';
import type { RefreshToken } from '@/schemas';

import type {
  RefreshTokenCreateParams,
  RefreshTokenDeleteParams,
  RefreshTokenFindByIdParams,
  RefreshTokenFindParams,
  RefreshTokenRepository,
} from '@/repositories';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private items: Map<number, RefreshToken>;

  constructor() {
    this.items = new Map();
  }

  async create(params: RefreshTokenCreateParams) {
    const newItem = makeRefreshToken(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async find({ token }: RefreshTokenFindParams) {
    for (const [, refreshToken] of this.items.entries()) {
      if (refreshToken.token === token) {
        return refreshToken;
      }
    }

    return null;
  }

  async findById({ id }: RefreshTokenFindByIdParams) {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async delete({ token }: RefreshTokenDeleteParams) {
    let foundItem = null;

    for (const [, refreshToken] of this.items.entries()) {
      if (refreshToken.token === token) {
        foundItem = refreshToken;
      }
    }

    return foundItem;
  }

  async deleteManyExpired() {
    for (const [, refreshToken] of this.items.entries()) {
      const now = new Date();
      const expiresAt = new Date(refreshToken.expiresAt);

      if (expiresAt < now) {
        this.items.delete(refreshToken.id);
      }
    }
  }

  async clear() {
    this.items.clear();
  }
}
