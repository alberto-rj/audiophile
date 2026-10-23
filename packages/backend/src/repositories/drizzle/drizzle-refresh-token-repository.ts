import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenFindManyParams,
  RefreshTokenIdParams,
  RefreshTokenTokenParams,
} from '@audiophile/shared';
import { count, eq, lt } from 'drizzle-orm';

import {
  db,
  refreshTokens,
  type RefreshToken as DrizzleRefreshToken,
} from '@/db/drizzle';

import type { RefreshTokenRepository } from '../types/refresh-token-repository.types';
import {
  getBaseResult,
  getOffset,
  type PaginateResult,
} from '@/helpers/paginate';

function toRefreshToken(rawItem: DrizzleRefreshToken): RefreshToken {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...refreshTokenWithoutTimestamp } = rawItem;

  return {
    ...refreshTokenWithoutTimestamp,
    createdAt: refreshTokenWithoutTimestamp.createdAt.toISOString(),
    expiresAt: refreshTokenWithoutTimestamp.expiresAt.toISOString(),
  };
}

export class DrizzleRefreshTokenRepository implements RefreshTokenRepository {
  async create(params: RefreshTokenCreateParams): Promise<RefreshToken> {
    const [createdRefreshToken] = await db
      .insert(refreshTokens)
      .values(params)
      .returning();

    return toRefreshToken(createdRefreshToken!);
  }

  async find({ token }: RefreshTokenTokenParams): Promise<RefreshToken | null> {
    const [foundRefreshToken] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);

    if (!foundRefreshToken) {
      return null;
    }

    return toRefreshToken(foundRefreshToken);
  }

  async findById({ id }: RefreshTokenIdParams): Promise<RefreshToken | null> {
    const [foundRefreshToken] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.id, id))
      .limit(1);

    if (!foundRefreshToken) {
      return null;
    }

    return toRefreshToken(foundRefreshToken);
  }

  async findMany({
    page,
    limit,
    userId,
  }: RefreshTokenFindManyParams): Promise<PaginateResult<RefreshToken>> {
    const [foundRefreshTokens, [countResult]] = await Promise.all([
      db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.userId, userId))
        .limit(limit)
        .offset(getOffset({ limit, page })),
      db
        .select({ totalCount: count() })
        .from(refreshTokens)
        .where(eq(refreshTokens.userId, userId)),
    ]);

    const totalItems = countResult!.totalCount;
    const result = getBaseResult({
      page: page,
      limit: limit,
      totalItems,
    });

    return {
      ...result,
      items: foundRefreshTokens.map(toRefreshToken),
    };
  }

  async delete({
    token,
  }: RefreshTokenTokenParams): Promise<RefreshToken | null> {
    const [deletedRefreshToken] = await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .returning();

    if (!deletedRefreshToken) {
      return null;
    }

    return toRefreshToken(deletedRefreshToken);
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
