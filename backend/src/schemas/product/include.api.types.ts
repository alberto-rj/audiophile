import type { z } from '@/config';

import type { ApiIncludeSchema } from './include.schema';

export type ApiInclude = z.infer<typeof ApiIncludeSchema>;
