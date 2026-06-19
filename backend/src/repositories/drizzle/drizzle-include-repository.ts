import { count, eq } from 'drizzle-orm';

import { db, includes, type Include as RawInclude } from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type { IncludeRepository } from '@/repositories';
import type {
  Include,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from '@/schemas';

function toItem(item: RawInclude): Include {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleIncludeRepository implements IncludeRepository {
  async create(params: IncludeCreateParams): Promise<Include> {
    const [createdItem] = await db.insert(includes).values(params).returning();

    return toItem(createdItem!);
  }

  async createMany(paramsList: IncludeCreateParams[]): Promise<Include[]> {
    const createdItems = await db
      .insert(includes)
      .values(paramsList)
      .returning();

    return createdItems.map(toItem);
  }

  async findById({ id }: IncludeFindByIdParams): Promise<Include | null> {
    const [foundItem] = await db
      .select()
      .from(includes)
      .where(eq(includes.id, id));

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: IncludeFindManyParams): Promise<PaginateResult<Include>> {
    const [foundItems, [totalItemsResult]] = await Promise.all([
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
      items: foundItems.map(toItem),
    };
  }

  async deleteById({ id }: IncludeDeleteByIdParams): Promise<Include | null> {
    const [deletedItem] = await db
      .delete(includes)
      .where(eq(includes.id, id))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return deletedItem;
  }

  async clear() {
    await db.delete(includes);
  }
}
