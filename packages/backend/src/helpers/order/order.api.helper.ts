import type { ApiOrder, Order } from '@audiophile/shared';

import { buildResponseImage } from '../cloudinary/cloudinary';
import { toSlug } from '../to-slug';

export function toApiOrder({ items, ...remainingFields }: Order): ApiOrder {
  return {
    items: items.map((item) => ({
      ...item,
      slug: toSlug(item.name),
      image: buildResponseImage(item.image, 'orderItem'),
    })),
    ...remainingFields,
  };
}
