import { z } from '@/config';

import { ProductIdSchema } from './product.base.schema';
import type {
  OtherProductCreateParamsSchema,
  OtherProductSchema,
} from './other-product.schema';

export type OtherProductId = z.infer<typeof ProductIdSchema>;

export type OtherProductCreateParams = z.infer<
  typeof OtherProductCreateParamsSchema
>;

export type OtherProduct = z.infer<typeof OtherProductSchema>;
