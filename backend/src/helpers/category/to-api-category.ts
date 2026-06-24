import type { ApiCategory, Category } from '@/schemas';

import { buildResponseImage } from '../cloudinary/cloudinary';

export function toApiCategory({ image, ...rest }: Category): ApiCategory {
  return {
    ...rest,
    image: buildResponseImage(image, 'category'),
  };
}
