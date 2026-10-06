import type { z } from '@/config';

import {
  ApiCartSchema,
  ApiCartIdParamsSchema,
  ApiCartPaginationQuerySchema,
  ApiCartAddItemBodySchema,
  ApiCartUpdateItemBodySchema,
} from './cart.api.schema';

export type ApiCart = z.infer<typeof ApiCartSchema>;

export type ApiCartAddItemBody = z.infer<typeof ApiCartAddItemBodySchema>;

export type ApiCartUpdateItemBody = z.infer<typeof ApiCartUpdateItemBodySchema>;

export type ApiCartIdParams = z.infer<typeof ApiCartIdParamsSchema>;

export type ApiCartPaginationQuery = z.infer<
  typeof ApiCartPaginationQuerySchema
>;
