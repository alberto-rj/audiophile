/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from '@/config';

import { ProductIdSchema } from './product.base.schema';

export const OtherProductCreateParamsSchema = z.object({
  otherId: ProductIdSchema,
  productId: ProductIdSchema,
});

export const OtherProductSchema = z.object({
  otherId: ProductIdSchema,
  productId: ProductIdSchema,
});
