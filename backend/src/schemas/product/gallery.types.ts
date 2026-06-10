import type { z } from '@/config';

import type {
  GalleryIdSchema,
  GalleryImageSchema,
} from './gallery.base.schema';
import type { ApiGallerySchema, GallerySchema } from './gallery.schema';

export type GalleryId = z.infer<typeof GalleryIdSchema>;

export type GalleryImage = z.infer<typeof GalleryImageSchema>;

export type Gallery = z.infer<typeof GallerySchema>;

export type ApiGallery = z.infer<typeof ApiGallerySchema>;
