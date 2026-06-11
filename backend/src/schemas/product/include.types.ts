import type { z } from '@/config';

import type {
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import type { IncludeSchema } from './include.schema';

export type IncludeQuantity = z.infer<typeof IncludeQuantitySchema>;

export type IncludeItem = z.infer<typeof IncludeItemSchema>;

export type Include = z.infer<typeof IncludeSchema>;
