import { z } from '@/config';

import {
  ProductCreateInputSchema,
  ProductFindManyInputSchema,
  ProductIdInputSchema,
  ProductSlugInputSchema,
} from './product.input.schema';

export type ProductIdInput = z.infer<typeof ProductIdInputSchema>;

export type ProductSlugInput = z.infer<typeof ProductSlugInputSchema>;

export type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>;

export type ProductFindManyInput = z.infer<typeof ProductFindManyInputSchema>;
