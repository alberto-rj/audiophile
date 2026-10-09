import type { z } from '@/config';

import { GalleryDetailedSchema, GallerySchema } from './gallery.schema';

export type Gallery = z.infer<typeof GallerySchema>;

export type GalleryDetailed = z.infer<typeof GalleryDetailedSchema>;
