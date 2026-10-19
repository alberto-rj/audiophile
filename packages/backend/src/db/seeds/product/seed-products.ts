import type {
  Category,
  GalleryCreateParams,
  IncludeCreateParams,
  Product,
  ProductCreateParams,
} from '@audiophile/shared';

import {
  galleryRepository,
  includeRepository,
  productRepository,
} from '@/config';
import { type Galleries, type Includes, type Products } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';

type CreateProductsParams = {
  products: Products;
  categories: Category[];
};

type CreateGalleriesParams = {
  products: Product[];
  galleries: Galleries;
};

type CreateIncludesParams = {
  products: Product[];
  includes: Includes;
};

type SeedProductsParams = {
  galleries: Galleries;
  includes: Includes;
  products: Products;
  categories: Category[];
};

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

export async function createProducts({
  categories,
  products,
}: CreateProductsParams) {
  const paramsList = toProductCreateParamsList({ categories, products });

  await productRepository.clear();
  const createdProducts = await productRepository.createMany(paramsList);

  return createdProducts;
}

async function createGalleries({ galleries, products }: CreateGalleriesParams) {
  const paramsList = toGalleryCreateParamsList({ galleries, products });

  const createdGalleries = await galleryRepository.createMany(paramsList);

  return createdGalleries;
}

async function createIncludes({ includes, products }: CreateIncludesParams) {
  const paramsList = toIncludeCreateParamsList({ includes, products });

  const createdIncludes = await includeRepository.createMany(paramsList);

  return createdIncludes;
}

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
