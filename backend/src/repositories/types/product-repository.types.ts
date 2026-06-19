import type { PaginateResult } from '@/helpers';
import type {
  Product,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductFindByIdParams,
  ProductFindManyParams,
} from '@/schemas';

export interface ProductRepository {
  create: (params: ProductCreateParams) => Promise<Product>;

  createMany: (params: ProductCreateParams[]) => Promise<Product[]>;

  findById: (params: ProductFindByIdParams) => Promise<Product | null>;

  findMany: (params: ProductFindManyParams) => Promise<PaginateResult<Product>>;

  deleteById: (params: ProductDeleteByIdParams) => Promise<Product | null>;

  clear: () => Promise<void>;
}
