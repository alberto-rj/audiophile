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

    category: category.name,
    categoryImage: buildResponseImage(category.image, 'category'),

    gallery: {
      first: buildResponseImage(gallery.first, 'gallery'),
      second: buildResponseImage(gallery.second, 'gallery'),
      third: buildResponseImage(gallery.third, 'gallery'),
    },
    includes,

    suggestions: suggestions.map(({ slug, name, image }) => ({
      name,
      slug,
      image: buildResponseImage(image, 'product'),
    })),
  };
}
