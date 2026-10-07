import type { z } from '@/config';

import type {
  GalleryCreateInputSchema,
  GalleryFindManyInputSchema,
  GalleryIdInputSchema,
} from './gallery.input.schema';

export type GalleryCreateInput = z.infer<typeof GalleryCreateInputSchema>;

export type GalleryFindManyInput = z.infer<typeof GalleryFindManyInputSchema>;

export type GalleryIdInput = z.infer<typeof GalleryIdInputSchema>;
