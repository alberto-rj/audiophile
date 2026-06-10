import { z } from '@/config';

import { GalleryIdSchema, GalleryImageSchema } from './gallery.base.schema';
import { ProductIdSchema } from './product.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';

export const GallerySchema = z.object({
  id: GalleryIdSchema,
  first: GalleryImageSchema,
  second: GalleryImageSchema,
  third: GalleryImageSchema,
  productId: ProductIdSchema,
});

export const ApiGallerySchema = z.object({
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});
