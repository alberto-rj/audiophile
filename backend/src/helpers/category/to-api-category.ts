import type { ApiCategory, Category } from '@audiophile/shared';

import { buildResponseImage } from '../cloudinary/cloudinary';

export function toApiCategory({ image, ...rest }: Category): ApiCategory {
  return {
    ...rest,
    image: buildResponseImage(image, 'category'),
  };
}
