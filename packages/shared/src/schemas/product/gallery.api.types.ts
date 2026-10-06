import type { z } from '@/config';

import type { ApiGallerySchema } from './gallery.api.schema';

export type ApiGallery = z.infer<typeof ApiGallerySchema>;
