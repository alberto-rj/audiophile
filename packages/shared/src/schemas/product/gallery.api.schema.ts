import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';

import {
  GalleryCreateParamsSchema,
  GalleryFindManyParamsSchema,
  GalleryIdParamsSchema,
} from './gallery.params.schema';

export const ApiGallerySchema = z.object({
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});

export const ApiGalleryIdParamsSchema = GalleryIdParamsSchema.extend({});

export const ApiGalleryCreateBodySchema = GalleryCreateParamsSchema.extend({});

export const ApiGalleryFindManyQuerySchema = GalleryFindManyParamsSchema.extend(
  {},
);
