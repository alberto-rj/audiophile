import type { PaginateResult } from '@/helpers';
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

export interface ProductRepository {
  create: (params: ProductCreateParams) => Promise<Product>;

  createMany: (params: ProductCreateParams[]) => Promise<Product[]>;

  findById: (params: ProductFindByIdParams) => Promise<ProductDetailed | null>;

  findBySlug: (
    params: ProductFindBySlugParams,
  ) => Promise<ProductDetailed | null>;

  findMany: (
    params: ProductFindManyParams,
  ) => Promise<PaginateResult<ProductDetailed>>;

  deleteById: (params: ProductDeleteByIdParams) => Promise<Product | null>;

  deleteBySlug: (params: ProductDeleteBySlugParams) => Promise<Product | null>;

  clear: () => Promise<void>;
}
