import type { z } from '@/config';

import { IncludeDetailedSchema, IncludeSchema } from './include.schema';

export type Include = z.infer<typeof IncludeSchema>;

export type IncludeDetailed = z.infer<typeof IncludeDetailedSchema>;
