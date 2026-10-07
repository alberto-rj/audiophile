import { z } from '@/config';

import { LimitSchema, PageSchema } from '../common/common.schema';

import { GalleryIdSchema, GalleryImageSchema } from './gallery.base.schema';
import { ProductIdSchema } from './product.base.schema';

export const GalleryCreateParamsSchema = z.object({
  first: GalleryImageSchema,
  second: GalleryImageSchema,
  third: GalleryImageSchema,
  productId: ProductIdSchema,
});

export const GalleryIdParamsSchema = z.object({
  id: GalleryIdSchema,
});

export const GalleryFindManyParamsSchema = z.object({
  limit: LimitSchema,
  page: PageSchema,
});
