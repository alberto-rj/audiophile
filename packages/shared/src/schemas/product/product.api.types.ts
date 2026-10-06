import type { z } from '@/config';

import type {
  ApiProductIdParamsSchema,
  ApiProductSchema,
  ApiProductSlugParamsSchema,
} from './product.api.schema';

export type ApiProduct = z.infer<typeof ApiProductSchema>;

export type ApiProductSlugParams = z.infer<typeof ApiProductSlugParamsSchema>;

export type ApiProductIdParams = z.infer<typeof ApiProductIdParamsSchema>;
