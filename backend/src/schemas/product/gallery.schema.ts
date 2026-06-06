import { z } from '@/config';

import { ResponsiveImageSchema } from '../common';

export const GalleryIdSchema = z.coerce.number().int().positive();

export const GallerySchema = z.object({
  id: GalleryIdSchema,
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});

export const ApiGallerySchema = GallerySchema.omit({ id: true });
