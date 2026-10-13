import type { z } from '@/config';

import type {
  ApiProductFindManyQuerySchema,
  ApiProductIdParamsSchema,
  ApiProductPaginationResponseSchema,
  ApiProductResultListResponseSchema,
  ApiProductSchema,
  ApiProductSlugParamsSchema,
} from './product.api.schema';

export type ApiProduct = z.infer<typeof ApiProductSchema>;

export type ApiProductSlugParams = z.infer<typeof ApiProductSlugParamsSchema>;

export type ApiProductIdParams = z.infer<typeof ApiProductIdParamsSchema>;

export type ApiProductFindManyQuery = z.infer<
  typeof ApiProductFindManyQuerySchema
>;

export type ApiProductResultListResponse = z.infer<
  typeof ApiProductResultListResponseSchema
>;

export type ApiProductPaginationResponse = z.infer<
  typeof ApiProductPaginationResponseSchema
>;
