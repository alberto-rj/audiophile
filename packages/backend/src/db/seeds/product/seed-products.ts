import {
  toSlug,
  type Category,
  type GalleryCreateParams,
  type IncludeCreateParams,
  type Product,
  type ProductCreateParams,
} from '@audiophile/shared';

import {
  productRepository,
  galleryRepository,
  includeRepository,
} from '@/config/repositories';
import {
  type Gallery as GalleryMock,
  type Include as IncludeMock,
  type Product as ProductMock,
} from '@/db/mocks';
import { logger } from '@/helpers/logger';

/**
 * @deprecated
 */
type CreateProductsParams = {
  products: ProductMock[];
  categories: Category[];
};

/**
 * @deprecated
 */
type CreateGalleriesParams = {
  products: Product[];
  galleries: GalleryMock[];
};

/**
 * @deprecated
 */
type CreateIncludesParams = {
  products: Product[];
  includes: IncludeMock[];
};

/**
 * @deprecated
 */
type SeedProductsParams = {
  galleries: GalleryMock[];
  includes: IncludeMock[];
  products: ProductMock[];
  categories: Category[];
};

/**
 * @deprecated
 */
function toProductCreateParamsList({
  categories,
  products,
}: CreateProductsParams): ProductCreateParams[] {
  const paramsList = products.map(
    ({ name, price, description, image, features, category }) => {
      const productCategory = categories.find(
        (pc) => pc.slug === toSlug(category),
      );

      if (!productCategory) {
        throw new Error(`"${category}" was not found for product "${name}"`);
      }

      return {
        categoryId: productCategory.id,
        slug: toSlug(name),
        image,
        name,
        price,
        description,
        features,
      };
    },
  );

  return paramsList;
}

/**
 * @deprecated
 */
function toGalleryCreateParamsList({
  products,
  galleries,
}: CreateGalleriesParams): GalleryCreateParams[] {
  const paramsList = galleries.map((gallery) => {
    const productSlug = toSlug(gallery.product);
    const product = products.find((product) => product.slug === productSlug);

    if (!product) {
      throw new Error(`Could not find product "${productSlug}"`);
    }

    return {
      productId: product.id,
      ...gallery,
    };
  });

  return paramsList;
}

/**
 * @deprecated
 */
function toIncludeCreateParamsList({
  includes,
  products,
}: CreateIncludesParams): IncludeCreateParams[] {
  return includes.map(({ quantity, item, product }) => {
    const productSlug = toSlug(product);
    const foundProduct = products.find(
      (product) => product.slug === productSlug,
    );

    if (!foundProduct) {
      throw new Error(`Could not find product "${productSlug}"`);
    }

    return {
      productId: foundProduct.id,
      quantity,
      item,
    };
  });
}

/**
 * @deprecated
 */
export async function createProducts({
  categories,
  products,
}: CreateProductsParams) {
  const paramsList = toProductCreateParamsList({ categories, products });

  await productRepository.clear();
  const createdProducts = await productRepository.createMany(paramsList);

  return createdProducts;
}

/**
 * @deprecated
 */
async function createGalleries({ galleries, products }: CreateGalleriesParams) {
  const paramsList = toGalleryCreateParamsList({ galleries, products });

  const createdGalleries = await galleryRepository.createMany(paramsList);

  return createdGalleries;
}

/**
 * @deprecated
 */
async function createIncludes({ includes, products }: CreateIncludesParams) {
  const paramsList = toIncludeCreateParamsList({ includes, products });

  const createdIncludes = await includeRepository.createMany(paramsList);

  return createdIncludes;
}

/**
 * @deprecated
 */
export async function seedProducts({
  galleries,
  categories,
  includes,
  products,
}: SeedProductsParams) {
  try {
    await Promise.all([galleryRepository.clear(), includeRepository.clear()]);
    await productRepository.clear();

    logger.info('Seeding "products"...');

    const createdProducts = await createProducts({
      categories,
      products,
    });

    await Promise.all([
      createGalleries({ galleries, products: createdProducts }),
      createIncludes({ includes, products: createdProducts }),
    ]);

    logger.info('"products" was successfully seeded.');
    return createdProducts;
  } catch (error) {
    logger.error('Failed to seed "products".', error);
    process.exit(1);
  }
}
