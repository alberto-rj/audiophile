import type { z } from '@/config';

import type {
  IncludeCreateParamsSchema,
  IncludeFindManyParamsSchema,
  IncludeIdParamsSchema,
} from './include.params.schema';

export type IncludeIdParams = z.infer<typeof IncludeIdParamsSchema>;

export type IncludeCreateParams = z.infer<typeof IncludeCreateParamsSchema>;

export type IncludeFindManyParams = z.infer<typeof IncludeFindManyParamsSchema>;
