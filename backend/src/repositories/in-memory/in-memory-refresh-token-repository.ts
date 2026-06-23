import { db } from '@/db/in-memory';
import { makeRefreshToken } from '@/helpers';
import type { RefreshToken } from '@/schemas';

import type {
  RefreshTokenCreateParams,
  RefreshTokenDeleteParams,
  RefreshTokenFindByIdParams,
  RefreshTokenFindParams,
  RefreshTokenRepository,
} from '../types/refresh-token-repository.types';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  async create(params: RefreshTokenCreateParams): Promise<RefreshToken> {
    const newItem = makeRefreshToken(params);

    db.refreshTokens.set(newItem.id, newItem);

    return newItem;
  }

  async find({ token }: RefreshTokenFindParams): Promise<RefreshToken | null> {
    const foundItem = Array.from(db.refreshTokens.values()).find(
      (item) => item.token === token,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findById({
    id,
  }: RefreshTokenFindByIdParams): Promise<RefreshToken | null> {
    const foundItem = Array.from(db.refreshTokens.values()).find(
      (item) => item.id === id,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async delete({
    token,
  }: RefreshTokenDeleteParams): Promise<RefreshToken | null> {
    const foundItem = Array.from(db.refreshTokens.values()).find(
      (item) => item.token === token,
    );

    if (!foundItem) {
      return null;
    }

    db.refreshTokens.delete(foundItem.id);

    return foundItem;
  }

  async deleteManyExpired(): Promise<void> {
    for (const [, refreshToken] of db.refreshTokens.entries()) {
      const now = new Date();
      const expiresAt = new Date(refreshToken.expiresAt);

      if (expiresAt < now) {
        db.refreshTokens.delete(refreshToken.id);
      }
    }
  }

  async clear(): Promise<void> {
    db.refreshTokens.clear();
  }
}
