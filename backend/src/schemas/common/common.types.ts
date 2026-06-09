import type { z } from '@/config';

import { ApiPaginationSchema, ResponsiveImageSchema } from './common.schema';

export type ResponsiveImage = z.infer<typeof ResponsiveImageSchema>;

export type Pagination = z.infer<typeof ApiPaginationSchema>;
