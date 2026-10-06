import { z } from '@/config';

import {
  ApiPaginationQuerySchema,
  ResponsiveImageSchema,
} from '../common/common.schema';
import { GalleryIdSchema, GalleryImageSchema } from './gallery.base.schema';
import { ProductIdSchema } from './product.base.schema';

export const ApiGallerySchema = z.object({
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});

export const ApiGalleryCreateBodySchema = z.object({
  first: GalleryImageSchema,
  second: GalleryImageSchema,
  third: GalleryImageSchema,
  productId: ProductIdSchema,
});

export const ApiGalleryIdParamsSchema = z.object({
  id: GalleryIdSchema,
});

export const ApiGalleryPaginationQuerySchema = ApiPaginationQuerySchema;
