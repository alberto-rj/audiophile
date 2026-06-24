import type { ApiProduct, ProductDetailed } from '@/schemas';

import { buildResponseImage } from '../cloudinary/cloudinary';

export function toApiProduct(product: ProductDetailed): ApiProduct {
  const {
    id,
    slug,
    description,
    features,
    isNew,
    price,
    name,
    image,
    category,
    includes,
    gallery,
    suggestions,
  } = product;

  return {
    id,
    slug,
    description,
    features,
    isNew,
    price,
    name,

    image: buildResponseImage(image, 'product'),
    previewImage: buildResponseImage(image, 'productPreview'),

    category: category.name,

    gallery: {
      first: buildResponseImage(gallery.first, 'firstGalleryItem'),
      second: buildResponseImage(gallery.second, 'secondGalleryItem'),
      third: buildResponseImage(gallery.third, 'thirdGalleryItem'),
    },
    includes,

    suggestions: suggestions.map(({ slug, name, image }) => ({
      name,
      slug,
      image: buildResponseImage(image, 'product'),
    })),
  };
}
