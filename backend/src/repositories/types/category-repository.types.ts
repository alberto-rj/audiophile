import type { PaginateResult } from '@/helpers';
import type {
  Category,
  CategoryCreateParams,
  CategoryFindManyParams,
  CategoryIdParams,
  CategorySlugParams,
  CategoryUpdateParams,
} from '@audiophile/shared';

export interface CategoryRepository {
  create: (params: CategoryCreateParams) => Promise<Category>;

  createMany: (params: CategoryCreateParams[]) => Promise<Category[]>;

  findById: (params: CategoryIdParams) => Promise<Category | null>;

  findBySlug: (params: CategorySlugParams) => Promise<Category | null>;

  findMany: (
    params: CategoryFindManyParams,
  ) => Promise<PaginateResult<Category>>;

  update: (params: CategoryUpdateParams) => Promise<Category | null>;

  deleteById: (params: CategoryIdParams) => Promise<Category | null>;

  deleteBySlug: (params: CategorySlugParams) => Promise<Category | null>;

  clear: () => Promise<void>;
}
