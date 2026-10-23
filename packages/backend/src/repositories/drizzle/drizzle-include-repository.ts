import type {
  Include,
  IncludeCreateParams,
  IncludeFindManyParams,
  IncludeIdParams,
} from '@audiophile/shared';
import { count, eq } from 'drizzle-orm';

import { db, includes, type Include as DrizzleInclude } from '@/db/drizzle';
import {
  getBaseResult,
  getOffset,
  type PaginateResult,
} from '@/helpers/paginate';

import type { IncludeRepository } from '../types/include-repository.types';

function toInclude(item: DrizzleInclude): Include {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleIncludeRepository implements IncludeRepository {
  async create(params: IncludeCreateParams): Promise<Include> {
    const [createdItem] = await db.insert(includes).values(params).returning();

    return toInclude(createdItem!);
  }

  async createMany(paramsList: IncludeCreateParams[]): Promise<Include[]> {
    const createdIncludes = await db
      .insert(includes)
      .values(paramsList)
      .returning();

    return createdIncludes.map(toInclude);
  }

  async findById({ id }: IncludeIdParams): Promise<Include | null> {
    const [foundInclude] = await db
      .select()
      .from(includes)
      .where(eq(includes.id, id));

    if (!foundInclude) {
      return null;
    }

    return foundInclude;
  }

  async findMany({
    page,
    limit,
  }: IncludeFindManyParams): Promise<PaginateResult<Include>> {
    const [foundIncludes, [totalItemsResult]] = await Promise.all([
      db
        .select()
        .from(includes)
        .limit(limit)
        .offset(getOffset({ limit, page })),
      db.select({ totalItems: count() }).from(includes),
    ]);

    const result = getBaseResult({
      limit,
      page,
      totalItems: totalItemsResult!.totalItems,
    });

    return {
      ...result,
      items: foundIncludes.map(toInclude),
    };
  }

  async deleteById({ id }: IncludeIdParams): Promise<Include | null> {
    const [deletedInclude] = await db
      .delete(includes)
      .where(eq(includes.id, id))
      .returning();

    if (!deletedInclude) {
      return null;
    }

    return deletedInclude;
  }

  async clear() {
    await db.delete(includes);
  }
}
