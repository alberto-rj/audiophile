import type { PaginateResult } from '@/helpers';
import type {
  Product,
  ProductCreateParams,
  ProductDetailed,
  ProductFindManyParams,
  ProductIdParams,
  ProductSlugParams,
} from '@audiophile/shared';

export interface ProductRepository {
  create: (params: ProductCreateParams) => Promise<Product>;

  createMany: (params: ProductCreateParams[]) => Promise<Product[]>;

  findById: (params: ProductIdParams) => Promise<ProductDetailed | null>;

  findBySlug: (params: ProductSlugParams) => Promise<ProductDetailed | null>;

  findMany: (
    params: ProductFindManyParams,
  ) => Promise<PaginateResult<ProductDetailed>>;

  deleteById: (params: ProductIdParams) => Promise<Product | null>;

  deleteBySlug: (params: ProductSlugParams) => Promise<Product | null>;

  clear: () => Promise<void>;
}
