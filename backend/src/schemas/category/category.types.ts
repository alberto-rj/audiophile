import { z } from '@/config';

import type {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.base.schema';
import type {
  ApiCategoryCreateBody,
  ApiCategoryIdParams,
  ApiCategoryPaginationQuery,
  ApiCategorySlugParams,
  ApiCategoryUpdateBody,
} from './category.api.types';
import type { CategorySchema } from './category.schema';

export type CategoryId = z.infer<typeof CategoryIdSchema>;

export type CategorySlug = z.infer<typeof CategorySlugSchema>;

export type CategoryImage = z.infer<typeof CategoryImageSchema>;

export type CategoryName = z.infer<typeof CategoryNameSchema>;

export type CategoryDescription = z.infer<typeof CategoryDescriptionSchema>;

export type Category = z.infer<typeof CategorySchema>;

export type CategoryCreateParams = ApiCategoryCreateBody;

export type CategoryUpdateParams = ApiCategoryUpdateBody;

export type CategoryFindByIdParams = ApiCategoryIdParams;

export type CategoryFindBySlugParams = ApiCategorySlugParams;

export type CategoryFindManyParams = ApiCategoryPaginationQuery;

export type CategoryDeleteByIdParams = ApiCategoryIdParams;

export type CategoryDeleteBySlugParams = ApiCategorySlugParams;
