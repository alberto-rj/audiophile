import type { z } from '@/config';

import { ResponsiveImageSchema } from './common.schema';

export type ResponsiveImage = z.infer<typeof ResponsiveImageSchema>;
