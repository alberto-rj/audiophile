import type { z } from '@/config';

import type {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import type { IncludeSchema } from './include.schema';
import type {
  ApiIncludeCreateBodySchema,
  ApiIncludeIdParamsSchema,
} from './include.api.schema';
import type { ApiPaginationQuerySchema } from '../common/common.schema';

export type IncludeId = z.infer<typeof IncludeIdSchema>;

export type IncludeQuantity = z.infer<typeof IncludeQuantitySchema>;

export type IncludeItem = z.infer<typeof IncludeItemSchema>;

export type Include = z.infer<typeof IncludeSchema>;

export type IncludeCreateParams = z.infer<typeof ApiIncludeCreateBodySchema>;

export type IncludeDeleteByIdParams = z.infer<typeof ApiIncludeIdParamsSchema>;

export type IncludeFindByIdParams = z.infer<typeof ApiIncludeIdParamsSchema>;

export type IncludeFindManyParams = z.infer<typeof ApiPaginationQuerySchema>;
