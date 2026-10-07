import type { z } from '@/config';

import type { GallerySchema } from './gallery.schema';

export type Gallery = z.infer<typeof GallerySchema>;
