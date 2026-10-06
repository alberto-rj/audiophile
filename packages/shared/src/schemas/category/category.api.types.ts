import { z } from '@/config';

import type {
  ApiCategoryCreateBodySchema,
  ApiCategoryFindManyQuerySchema,
  ApiCategoryIdParamsSchema,
  ApiCategoryPaginationResponseSchema,
  ApiCategoryResultListResponseSchema,
  ApiCategorySchema,
  ApiCategorySlugParamsSchema,
  ApiCategoryUpdateBodySchema,
} from './category.api.schema';

export type ApiCategoryCreateBody = z.infer<typeof ApiCategoryCreateBodySchema>;

export type ApiCategoryUpdateBody = z.infer<typeof ApiCategoryUpdateBodySchema>;

export type ApiCategoryFindManyQuery = z.infer<
  typeof ApiCategoryFindManyQuerySchema
>;

export type ApiCategorySlugParams = z.infer<typeof ApiCategorySlugParamsSchema>;

export type ApiCategoryIdParams = z.infer<typeof ApiCategoryIdParamsSchema>;

export type ApiCategory = z.infer<typeof ApiCategorySchema>;

export type ApiCategoryResultListResponse = z.infer<
  typeof ApiCategoryResultListResponseSchema
>;

export type ApiCategoryPaginationResponse = z.infer<
  typeof ApiCategoryPaginationResponseSchema
>;
