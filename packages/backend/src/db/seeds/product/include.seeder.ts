import {
  toSlug,
  type Include,
  type IncludeCreateParams,
  type Product,
} from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { IncludeRepository } from '@/repositories/types';

import type { IncludeSeed } from './include.seeds';

type RunParams = {
  includes: IncludeSeed[];
  products: Product[];
};

type ToCreateParams = {
  include: IncludeSeed;
  products: Product[];
};

export class IncludeSeeder {
  constructor(private includeRepository: IncludeRepository) {}

  static toCreateParams({
    include: { item, quantity, product },
    products,
  }: ToCreateParams): IncludeCreateParams {
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
  }

  async run({ includes, products }: RunParams): Promise<Include[]> {
    const paramsList = includes.map((include) =>
      IncludeSeeder.toCreateParams({ include, products }),
    );

    const createdIncludes = await this.includeRepository.createMany(paramsList);

    return createdIncludes;
  }

  async safeRun({ includes, products }: RunParams): Promise<Include[]> {
    try {
      logger.info('Seeding "includes"...');
      const createdIncludes = await this.run({ includes, products });
      logger.info('"includes" was successfully seeded.');
      return createdIncludes;
    } catch (error) {
      logger.error('Failed to seed "includes".', error);
      process.exit(1);
    }
  }
}
