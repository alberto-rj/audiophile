import type { Gallery, GalleryCreateParams } from '@/schemas';

import { makeId } from '../make-id';

export function makeGallery({ ...rest }: GalleryCreateParams): Gallery {
  return {
    ...rest,
    id: makeId(),
  };
}
