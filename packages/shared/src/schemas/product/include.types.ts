import type { z } from '@/config';

import type { IncludeSchema } from './include.schema';

export type Include = z.infer<typeof IncludeSchema>;
