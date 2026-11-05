import {
  toSlug,
  type Gallery,
  type GalleryCreateParams,
  type Product,
} from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { GalleryRepository } from '@/repositories/types';

import type { GallerySeed } from './gallery.seeds';

type ToCreateParams = {
  products: Product[];
  gallery: GallerySeed;
};

type RunParams = {
  products: Product[];
  galleries: GallerySeed[];
};

export class GallerySeeder {
  constructor(private galleryRepository: GalleryRepository) {}

  static toCreateParams({
    products,
    gallery,
  }: ToCreateParams): GalleryCreateParams {
    const productSlug = toSlug(gallery.product);
    const product = products.find((product) => product.slug === productSlug);

    if (!product) {
      throw new Error(`Could not find product "${productSlug}"`);
    }

    return {
      productId: product.id,
      ...gallery,
    };
  }

  async run({ galleries, products }: RunParams): Promise<Gallery[]> {
    const paramsList = galleries.map((gallery) =>
      GallerySeeder.toCreateParams({
        gallery,
        products,
      }),
    );

    const createdGalleries =
      await this.galleryRepository.createMany(paramsList);

    return createdGalleries;
  }

  async safeRun({ galleries, products }: RunParams): Promise<Gallery[]> {
    try {
      logger.info('Seeding "galleries"...');
      const createdGalleries = await this.run({ galleries, products });
      logger.info('"galleries" was successfully seeded.');
      return createdGalleries;
    } catch (error) {
      logger.error('Failed to seed "galleries".', error);
      process.exit(1);
    }
  }
}
