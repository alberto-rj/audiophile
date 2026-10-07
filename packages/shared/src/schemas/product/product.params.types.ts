import { z } from '@/config';

import {
  ProductCreateParamsSchema,
  ProductFindManyParamsSchema,
  ProductIdParamsSchema,
  ProductSlugParamsSchema,
} from './product.params.schema';

export type ProductIdParams = z.infer<typeof ProductIdParamsSchema>;

export type ProductSlugParams = z.infer<typeof ProductSlugParamsSchema>;

export type ProductCreateParams = z.infer<typeof ProductCreateParamsSchema>;

export type ProductFindManyParams = z.infer<typeof ProductFindManyParamsSchema>;
