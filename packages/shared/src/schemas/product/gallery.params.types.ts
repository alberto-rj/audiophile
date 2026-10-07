import type { z } from '@/config';

import type {
  GalleryCreateParamsSchema,
  GalleryFindManyParamsSchema,
  GalleryIdParamsSchema,
} from './gallery.params.schema';

export type GalleryCreateParams = z.infer<typeof GalleryCreateParamsSchema>;

export type GalleryFindManyParams = z.infer<typeof GalleryFindManyParamsSchema>;

export type GalleryIdParams = z.infer<typeof GalleryIdParamsSchema>;
