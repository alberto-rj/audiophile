import { eq, lt } from 'drizzle-orm';

import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenDeleteParams,
  RefreshTokenFindByIdParams,
  RefreshTokenFindParams,
} from '@/schemas';
import {
  db,
  refreshTokens,
  type RefreshToken as DrizzleRefreshToken,
} from '@/db/drizzle';

import type { RefreshTokenRepository } from '../types/refresh-token-repository.types';

function parseItem(rawItem: DrizzleRefreshToken): RefreshToken {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...itemWithoutTimestamp } = rawItem;

  return {
    ...itemWithoutTimestamp,
    createdAt: itemWithoutTimestamp.createdAt.toISOString(),
    expiresAt: itemWithoutTimestamp.expiresAt.toISOString(),
  };
}

export class DrizzleRefreshTokenRepository implements RefreshTokenRepository {
  async create(params: RefreshTokenCreateParams): Promise<RefreshToken> {
    const [createdItem] = await db
      .insert(refreshTokens)
      .values(params)
      .returning();

    return parseItem(createdItem!);
  }

  async find({ token }: RefreshTokenFindParams): Promise<RefreshToken | null> {
    const [foundItem] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);

    if (!foundItem) {
      return null;
    }

    return parseItem(foundItem);
  }

  async findById({
    id,
  }: RefreshTokenFindByIdParams): Promise<RefreshToken | null> {
    const [foundItem] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.id, id))
      .limit(1);

    if (!foundItem) {
      return null;
    }

    return parseItem(foundItem);
  }

  async delete({
    token,
  }: RefreshTokenDeleteParams): Promise<RefreshToken | null> {
    const [deletedItem] = await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return parseItem(deletedItem);
  }

  async deleteManyExpired(): Promise<void> {
    await db
      .delete(refreshTokens)
      .where(lt(refreshTokens.expiresAt, new Date()));
  }

  async clear(): Promise<void> {
    await db.delete(refreshTokens);
  }
}
