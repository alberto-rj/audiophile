import {
  toSlug,
  type Category,
  type ProductCreateParams,
} from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { ProductRepository } from '@/repositories/types';

import type { ProductSeed } from './product.seeds';

type RunParams = {
  products: ProductSeed[];
  categories: Category[];
};

type ToCreateParams = {
  product: ProductSeed;
  categories: Category[];
};

export class ProductSeeder {
  constructor(private productRepository: ProductRepository) {}

  static toCreateParams({
    product: { name, price, description, image, features, category },
    categories,
  }: ToCreateParams): ProductCreateParams {
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
  }

  async run({ categories, products }: RunParams) {
    const paramsList = products.map((product) =>
      ProductSeeder.toCreateParams({
        product,
        categories,
      }),
    );

    const createdProducts = await this.productRepository.createMany(paramsList);

    return createdProducts;
  }

  async safeRun({ products, categories }: RunParams) {
    try {
      logger.info('Seeding "products"...');

      const createdProducts = await this.run({
        categories,
        products,
      });

      logger.info('"products" was successfully seeded.');
      return createdProducts;
    } catch (error) {
      logger.error('Failed to seed "products".', error);
      process.exit(1);
    }
  }
}
