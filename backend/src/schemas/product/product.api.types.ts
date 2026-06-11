import type { z } from '@/config';

import type { ApiProductSchema } from './product.api.schema';

export type ApiProduct = z.infer<typeof ApiProductSchema>;
