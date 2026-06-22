import { count, eq } from 'drizzle-orm';

import { db, products, type Product as RawProduct } from '@/db/drizzle';
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
  createdAt: false,
  updatedAt: false,
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _inferRawProductDetailed() {
  return db.query.products.findFirst({
    with: PRODUCT_WITH,
    columns: PRODUCT_COLUMNS,
  });
}

type RawProductDetailed = NonNullable<
  Awaited<ReturnType<typeof _inferRawProductDetailed>>
>;

function toItem(item: RawProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  const distance = new Date().getTime() - createdAt.getTime();
  const distanceInSeconds = Math.floor(distance / 1000);
  const distanceInHours = Math.floor(distanceInSeconds / 3600);
  const distanceInDays = Math.floor(distanceInHours / 24);
  const isNew = distanceInDays < 8;

  return {
    ...itemWithoutTimestamp,
    isNew,
  };
}

function toItemDetailed(item: RawProductDetailed): ProductDetailed {
  return {
    ...item,
    suggestions: item.suggestedIns.map((item) => ({
      name: item.suggestion.name,
      slug: item.suggestion.slug,
      image: item.suggestion.image,
    })),
  };
}

export class DrizzleProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const [createdItem] = await db.insert(products).values(params).returning();

    return toItem(createdItem!);
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    const createdItems = await db
      .insert(products)
      .values(paramsList)
      .returning();

    return createdItems.map(toItem);
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

    return toItemDetailed(foundItem);
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

    return toItemDetailed(foundItem);
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

    const totalItems = totalItemsResult!.totalItems;
    const result = getBaseResult({
      limit,
      page,
      totalItems,
    });

    return {
      ...result,
      items: foundItems.map(toItemDetailed),
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
