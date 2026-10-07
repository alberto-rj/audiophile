import type { z } from '@/config';

import type {
  IncludeCreateInputSchema,
  IncludeFindManyInputSchema,
  IncludeIdInputSchema,
} from './include.input.schema';

export type IncludeIdInput = z.infer<typeof IncludeIdInputSchema>;

export type IncludeCreateInput = z.infer<typeof IncludeCreateInputSchema>;

export type IncludeFindManyInput = z.infer<typeof IncludeFindManyInputSchema>;
