import type { z } from '@/config';

import type {
  GalleryIdSchema,
  GalleryImageSchema,
} from './gallery.base.schema';
import type { GallerySchema } from './gallery.schema';
import type {
  ApiGalleryCreateBodySchema,
  ApiGalleryIdParamsSchema,
  ApiGalleryPaginationQuerySchema,
} from './gallery.api.schema';

export type GalleryId = z.infer<typeof GalleryIdSchema>;

export type GalleryImage = z.infer<typeof GalleryImageSchema>;

export type Gallery = z.infer<typeof GallerySchema>;

export type GalleryCreateParams = z.infer<typeof ApiGalleryCreateBodySchema>;

export type GalleryFindByIdParams = z.infer<typeof ApiGalleryIdParamsSchema>;

export type GalleryDeleteByIdParams = z.infer<typeof ApiGalleryIdParamsSchema>;

export type GalleryFindManyParams = z.infer<
  typeof ApiGalleryPaginationQuerySchema
>;
