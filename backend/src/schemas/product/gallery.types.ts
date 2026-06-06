import type { z } from '@/config';

import {
  ApiGallerySchema,
  GalleryIdSchema,
  GallerySchema,
} from './gallery.schema';

export type GalleryId = z.infer<typeof GalleryIdSchema>;

export type Gallery = z.infer<typeof GallerySchema>;

export type ApiGallery = z.infer<typeof ApiGallerySchema>;
