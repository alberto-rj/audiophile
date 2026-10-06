import type { z } from '@/config';

import {
  ApiPaginationQuerySchema,
  ApiPaginationResponseSchema,
  ResponsiveImageSchema,
} from './common.schema';

export type ResponsiveImage = z.infer<typeof ResponsiveImageSchema>;

export type ApiPaginationQuery = z.infer<typeof ApiPaginationQuerySchema>;

export type ApiPaginationResponse = z.infer<typeof ApiPaginationResponseSchema>;
