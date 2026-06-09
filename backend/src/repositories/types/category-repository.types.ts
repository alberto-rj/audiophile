import type {
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
} from '@/schemas';
import type {
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryFindManyParams,
} from '@/schemas/category/category.types';

export interface CategoryRepository {
  create: (params: CategoryCreateParams) => Promise<Category>;

  findById: (params: CategoryFindByIdParams) => Promise<Category | null>;

  findBySlug: (params: CategoryFindBySlugParams) => Promise<Category | null>;

  findMany: (params: CategoryFindManyParams) => Promise<Category[]>;

  update: (params: CategoryUpdateParams) => Promise<Category | null>;

  deleteById: (params: CategoryDeleteByIdParams) => Promise<Category | null>;

  deleteBySlug: (
    params: CategoryDeleteBySlugParams,
  ) => Promise<Category | null>;

  clear: () => Promise<void>;
}
