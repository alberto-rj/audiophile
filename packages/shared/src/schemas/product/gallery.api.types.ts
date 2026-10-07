import type { z } from '@/config';

import type {
  ApiGalleryCreateBodySchema,
  ApiGalleryFindManyQuerySchema,
  ApiGalleryIdParamsSchema,
  ApiGallerySchema,
} from './gallery.api.schema';

export type ApiGallery = z.infer<typeof ApiGallerySchema>;

export type ApiGalleryIdParams = z.infer<typeof ApiGalleryIdParamsSchema>;

export type ApiGalleryCreateBody = z.infer<typeof ApiGalleryCreateBodySchema>;

export type ApiGalleryFindManyQuery = z.infer<
  typeof ApiGalleryFindManyQuerySchema
>;
