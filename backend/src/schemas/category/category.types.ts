import { z } from '@/config';

import {
  CategorySchema,
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
  CategoryCreateParamsSchema,
  CategoryUpdateParamsSchema,
  CategoryDeleteByIdParamsSchema,
  CategoryDeleteBySlugParamsSchema,
  CategoryFindByIdParamsSchema,
  CategoryFindBySlugParamsSchema,
  ApiCategorySchema,
} from './category.schema';
import type { Pagination } from '../common/common.types';

export type CategoryId = z.infer<typeof CategoryIdSchema>;

export type CategorySlug = z.infer<typeof CategorySlugSchema>;

export type CategoryImage = z.infer<typeof CategoryImageSchema>;

export type CategoryName = z.infer<typeof CategoryNameSchema>;

export type CategoryDescription = z.infer<typeof CategoryDescriptionSchema>;

export type Category = z.infer<typeof CategorySchema>;

export type CategoryCreateParams = z.infer<typeof CategoryCreateParamsSchema>;

export type CategoryUpdateParams = z.infer<typeof CategoryUpdateParamsSchema>;

export type CategoryFindByIdParams = z.infer<
  typeof CategoryFindByIdParamsSchema
>;

export type CategoryFindBySlugParams = z.infer<
  typeof CategoryFindBySlugParamsSchema
>;

export type CategoryFindManyParams = Pagination;

export type CategoryDeleteByIdParams = z.infer<
  typeof CategoryDeleteByIdParamsSchema
>;

export type CategoryDeleteBySlugParams = z.infer<
  typeof CategoryDeleteBySlugParamsSchema
>;

export type ApiCategory = z.infer<typeof ApiCategorySchema>;
