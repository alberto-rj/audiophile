import { z } from '@/config';

import type {
  ApiCategoryCreateBodySchema,
  ApiCategoryIdParamsSchema,
  ApiCategoryPaginationQuerySchema,
  ApiCategorySchema,
  ApiCategorySlugParamsSchema,
  ApiCategoryUpdateBodySchema,
} from './category.api.schema';

export type ApiCategoryCreateBody = z.infer<typeof ApiCategoryCreateBodySchema>;

export type ApiCategoryUpdateBody = z.infer<typeof ApiCategoryUpdateBodySchema>;

export type ApiCategoryPaginationQuery = z.infer<
  typeof ApiCategoryPaginationQuerySchema
>;

export type ApiCategorySlugParams = z.infer<typeof ApiCategorySlugParamsSchema>;

export type ApiCategoryIdParams = z.infer<typeof ApiCategoryIdParamsSchema>;

export type ApiCategory = z.infer<typeof ApiCategorySchema>;
