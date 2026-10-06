import type { z } from '@/config';

import type { ApiIncludeSchema } from './include.api.schema';

export type ApiInclude = z.infer<typeof ApiIncludeSchema>;
