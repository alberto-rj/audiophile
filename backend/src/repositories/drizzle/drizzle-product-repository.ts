import type {
  GalleryDetailed,
  IncludeDetailed,
  Product,
  ProductCreateParams,
  ProductDetailed,
  ProductFindManyParams,
  ProductIdParams,
  ProductSlugParams,
} from '@audiophile/shared';
import { count, eq } from 'drizzle-orm';

import {
  db,
  products,
  type Product as DrizzleProduct,
  type Category as DrizzleCategory,
} from '@/db/drizzle';
import {
  getBaseResult,
  getOffset,
  isNewProduct,
  type PaginateResult,
} from '@/helpers';
import type { ProductRepository } from '@/repositories';

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
  targets: {
    columns: {},
    with: {
      source: {
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

export type DrizzleProductDetailed = Omit<DrizzleProduct, 'categoryId'> & {
  category: Pick<DrizzleCategory, 'name' | 'slug' | 'description' | 'image'>;
  gallery: GalleryDetailed;
  includes: IncludeDetailed[];
  targets: {
    source: Pick<DrizzleProduct, 'name' | 'slug' | 'image'>;
  }[];
};

export class DrizzleProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const [createdProduct] = await db
      .insert(products)
      .values(params)
      .returning();

    return toProduct(createdProduct!);
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    return db.transaction(async (tx) => {
      const createdProducts = await tx
        .insert(products)
        .values(paramsList)
        .returning();

      return createdProducts.map(toProduct);
    });
  }

  async findById({ id }: ProductIdParams): Promise<ProductDetailed | null> {
    const foundProduct = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: PRODUCT_WITH,
      columns: PRODUCT_COLUMNS,
    });

    if (!foundProduct) {
      return null;
    }

    return toProductDetailed(foundProduct as DrizzleProductDetailed);
  }

  async findBySlug({
    slug,
  }: ProductSlugParams): Promise<ProductDetailed | null> {
    const foundProduct = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: PRODUCT_WITH,
      columns: PRODUCT_COLUMNS,
    });

    if (!foundProduct) {
      return null;
    }

    return toProductDetailed(foundProduct as DrizzleProductDetailed);
  }

  async findMany({
    page,
    limit,
    category,
  }: ProductFindManyParams): Promise<PaginateResult<ProductDetailed>> {
    const [foundProducts, [totalProductsResult]] = await Promise.all([
      db.query.products.findMany({
        with: PRODUCT_WITH,
        columns: PRODUCT_COLUMNS,
        limit,
        offset: getOffset({ limit, page }),
      }),
      db.select({ totalItems: count() }).from(products),
    ]);

    const result = getBaseResult({
      limit,
      page,
      totalItems: totalProductsResult!.totalItems,
    });

    return {
      ...result,
      items: foundProducts.map((item) =>
        toProductDetailed(item as DrizzleProductDetailed),
      ),
    };
  }

  async deleteById({ id }: ProductIdParams): Promise<Product | null> {
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deletedProduct) {
      return null;
    }

    return toProduct(deletedProduct);
  }

  async deleteBySlug({ slug }: ProductSlugParams): Promise<Product | null> {
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.slug, slug))
      .returning();

    if (!deletedProduct) {
      return null;
    }

    return toProduct(deletedProduct);
  }

  async clear() {
    await db.delete(products);
  }
}

function toProduct(product: DrizzleProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...productWithoutTimestamp } = product;

  return {
    ...productWithoutTimestamp,
    isNew: isNewProduct(createdAt),
  };
}

function toProductDetailed(product: DrizzleProductDetailed): ProductDetailed {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...productWithoutTimestamp } = product;

  return {
    ...productWithoutTimestamp,
    isNew: isNewProduct(createdAt),
    suggestions: productWithoutTimestamp.targets.map(({ source }) => ({
      ...source,
    })),
  };
}
