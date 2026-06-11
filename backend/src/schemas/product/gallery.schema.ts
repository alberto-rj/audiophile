import { z } from '@/config';

import { GalleryIdSchema, GalleryImageSchema } from './gallery.base.schema';
import { ProductIdSchema } from './product.base.schema';

export const GallerySchema = z.object({
  id: GalleryIdSchema,
  first: GalleryImageSchema,
  second: GalleryImageSchema,
  third: GalleryImageSchema,
  productId: ProductIdSchema,
});
