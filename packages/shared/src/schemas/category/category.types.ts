import { z } from '@/config';

import type { CategoryDetailedSchema, CategorySchema } from './category.schema';

export type Category = z.infer<typeof CategorySchema>;

export type CategoryDetailed = z.infer<typeof CategoryDetailedSchema>;
