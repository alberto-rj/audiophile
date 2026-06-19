import { asc, count, eq } from 'drizzle-orm';

import { db, products, type Product as RawProduct } from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type { ProductRepository } from '@/repositories';
import type {
  Product,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductFindByIdParams,
  ProductFindManyParams,
} from '@/schemas';

function parseItem(item: RawProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  const distance = new Date().getTime() - createdAt.getTime();
  const isNew = distance / 1000 / 3600 / 24 < 8;

  return {
    ...itemWithoutTimestamp,
    isNew,
  };
}

export class DrizzleProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const [createdItem] = await db.insert(products).values(params).returning();

    return parseItem(createdItem!);
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    const createdItems = await db
      .insert(products)
      .values(paramsList)
      .returning();

    return createdItems.map(parseItem);
  }

  async findById({ id }: ProductFindByIdParams): Promise<Product | null> {
    const [foundItem] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!foundItem) {
      return null;
    }

    return parseItem(foundItem);
  }

  async findMany({
    page,
    limit,
  }: ProductFindManyParams): Promise<PaginateResult<Product>> {
    const [foundItems, [totalItemsResult]] = await Promise.all([
      db
        .select()
        .from(products)
        .orderBy(asc(products.createdAt))
        .limit(limit)
        .offset(getOffset({ limit, page: page })),
      db.select({ totalItems: count() }).from(products),
    ]);

    const totalItems = totalItemsResult!.totalItems;
    const result = getBaseResult({
      limit: limit,
      page: page,
      totalItems,
    });

    return {
      ...result,
      items: foundItems.map(parseItem),
    };
  }

  async deleteById({ id }: ProductDeleteByIdParams): Promise<Product | null> {
    const [deletedItem] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return parseItem(deletedItem);
  }

  async clear() {
    await db.delete(products);
  }
}
