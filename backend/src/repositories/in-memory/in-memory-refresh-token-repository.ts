import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenIdParams,
  RefreshTokenTokenParams,
} from '@audiophile/shared';

import { db } from '@/db/in-memory';
import { makeRefreshToken } from '@/helpers';

import type { RefreshTokenRepository } from '../types/refresh-token-repository.types';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  async create(params: RefreshTokenCreateParams): Promise<RefreshToken> {
    const createdRefreshToken = makeRefreshToken(params);

    db.refreshTokens.set(createdRefreshToken.id, createdRefreshToken);

    return createdRefreshToken;
  }

  async find({ token }: RefreshTokenTokenParams): Promise<RefreshToken | null> {
    const foundRefreshToken = Array.from(db.refreshTokens.values()).find(
      (item) => item.token === token,
    );

    if (!foundRefreshToken) {
      return null;
    }

    return foundRefreshToken;
  }

  async findById({ id }: RefreshTokenIdParams): Promise<RefreshToken | null> {
    const foundRefreshToken = Array.from(db.refreshTokens.values()).find(
      (item) => item.id === id,
    );

    if (!foundRefreshToken) {
      return null;
    }

    return foundRefreshToken;
  }

  async delete({
    token,
  }: RefreshTokenTokenParams): Promise<RefreshToken | null> {
    const foundRefreshToken = Array.from(db.refreshTokens.values()).find(
      (item) => item.token === token,
    );

    if (!foundRefreshToken) {
      return null;
    }

    db.refreshTokens.delete(foundRefreshToken.id);

    return foundRefreshToken;
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
