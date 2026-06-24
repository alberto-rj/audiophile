import { count, eq } from 'drizzle-orm';

import {
  db,
  products,
  type Product as RawProduct,
  type ProductDetailed as RawProductDetailed,
} from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type { ProductRepository } from '@/repositories';
import type {
  Product,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductDeleteBySlugParams,
  ProductDetailed,
  ProductFindByIdParams,
  ProductFindBySlugParams,
  ProductFindManyParams,
} from '@/schemas';

const PRODUCT_WITH = {
  category: {
    columns: {
      name: true,
      slug: true,
      description: true,
      image: true,
    },
  },
  gallery: {
    columns: {
      first: true,
      second: true,
      third: true,
    },
  },
  includes: {
    columns: {
      item: true,
      quantity: true,
    },
  },
  suggestedIns: {
    columns: {},
    with: {
      suggestion: {
        columns: {
          name: true,
          slug: true,
          image: true,
        },
      },
    },
  },
} as const;

const PRODUCT_COLUMNS = {
  categoryId: false,
} as const;

export class DrizzleProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const [createdItem] = await db.insert(products).values(params).returning();

    return toItem(createdItem!);
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    return db.transaction(async (tx) => {
      const createdItems = await tx
        .insert(products)
        .values(paramsList)
        .returning();

      return createdItems.map(toItem);
    });
  }

  async findById({
    id,
  }: ProductFindByIdParams): Promise<ProductDetailed | null> {
    const foundItem = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: PRODUCT_WITH,
      columns: PRODUCT_COLUMNS,
    });

    if (!foundItem) {
      return null;
    }

    return toItemDetailed(foundItem as RawProductDetailed);
  }

  async findBySlug({
    slug,
  }: ProductFindBySlugParams): Promise<ProductDetailed | null> {
    const foundItem = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: PRODUCT_WITH,
      columns: PRODUCT_COLUMNS,
    });

    if (!foundItem) {
      return null;
    }

    return toItemDetailed(foundItem as RawProductDetailed);
  }

  async findMany({
    page,
    limit,
  }: ProductFindManyParams): Promise<PaginateResult<ProductDetailed>> {
    const [foundItems, [totalItemsResult]] = await Promise.all([
      db.query.products.findMany({
        limit,
        offset: getOffset({ limit, page }),
        with: PRODUCT_WITH,
        columns: PRODUCT_COLUMNS,
      }),
      db.select({ totalItems: count() }).from(products),
    ]);

    const result = getBaseResult({
      limit,
      page,
      totalItems: totalItemsResult!.totalItems,
    });

    return {
      ...result,
      items: foundItems.map((item) =>
        toItemDetailed(item as RawProductDetailed),
      ),
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

    return toItem(deletedItem);
  }

  async deleteBySlug({
    slug,
  }: ProductDeleteBySlugParams): Promise<Product | null> {
    const [deletedItem] = await db
      .delete(products)
      .where(eq(products.slug, slug))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return toItem(deletedItem);
  }

  async clear() {
    await db.delete(products);
  }
}

function isNewItem(createdAt: Date) {
  const distance = new Date().getTime() - createdAt.getTime();
  const distanceInSeconds = Math.floor(distance / 1000);
  const distanceInHours = Math.floor(distanceInSeconds / 3600);
  const distanceInDays = Math.floor(distanceInHours / 24);
  const isNew = distanceInDays < 8;

  return isNew;
}

function toItem(item: RawProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return {
    ...itemWithoutTimestamp,
    isNew: isNewItem(createdAt),
  };
}

function toItemDetailed(item: RawProductDetailed): ProductDetailed {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return {
    ...itemWithoutTimestamp,
    isNew: isNewItem(createdAt),
    suggestions: itemWithoutTimestamp.suggestedIns.map(({ suggestion }) => ({
      ...suggestion,
    })),
  };
}
