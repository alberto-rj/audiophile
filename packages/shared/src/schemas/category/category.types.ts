import { z } from '@/config';

import type { CategorySchema } from './category.schema';

export type Category = z.infer<typeof CategorySchema>;
