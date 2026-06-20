import {
  galleryRepository,
  includeRepository,
  productRepository,
} from '@/config';
import { type Galleries, type Includes, type Products } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';
import type { Category, Product } from '@/schemas';

type CreateProductsParams = {
  categories: Category[];
  products: Products;
};

export async function createProducts({
  categories,
  products,
}: CreateProductsParams) {
  const newParamsList = products.map(
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

  await productRepository.clear();

  const createdProducts = await productRepository.createMany(newParamsList);

  return createdProducts;
}

type CreateGalleriesParams = {
  products: Product[];
  galleries: Galleries;
};

async function createGalleries({ products, galleries }: CreateGalleriesParams) {
  const newParamsList = galleries.map((gallery) => {
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

  const createdGalleries = await galleryRepository.createMany(newParamsList);

  return createdGalleries;
}

type CreateIncludesParams = {
  products: Product[];
  includes: Includes;
};

async function createIncludes({ products, includes }: CreateIncludesParams) {
  const newParamsList = includes.map(({ quantity, item, product }) => {
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

  const createdIncludes = await includeRepository.createMany(newParamsList);

  return createdIncludes;
}

type SeedProductsParams = {
  galleries: Galleries;
  includes: Includes;
  products: Products;
  categories: Category[];
};

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
