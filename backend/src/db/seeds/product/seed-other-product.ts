import { otherProductRepository } from '@/config';
import type { OtherProducts } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';
import type { Product } from '@/schemas';

type CreateOtherProductsParams = {
  products: Product[];
  otherProducts: OtherProducts;
};

export async function createOtherProducts({
  products,
  otherProducts,
}: CreateOtherProductsParams) {
  const newParamsList = otherProducts.map((op) => {
    const otherSlug = toSlug(op.other);
    const other = products.find((p) => p.slug === otherSlug);

    const productSlug = toSlug(op.product);
    const product = products.find((p) => p.slug === productSlug);

    if (!other) {
      throw new Error(`Cannot find other product "${otherSlug}"`);
    }

    if (!product) {
      throw new Error(`Cannot find product "${productSlug}"`);
    }

    return {
      otherId: other.id,
      productId: product.id,
    };
  });

  const createdOtherProducts =
    await otherProductRepository.createMany(newParamsList);

  return createdOtherProducts;
}

export async function seedOtherProducts({
  products,
  otherProducts,
}: CreateOtherProductsParams) {
  try {
    logger.info('Seeding "otherProducts"...');
    const createdOtherProducts = await createOtherProducts({
      products,
      otherProducts,
    });
    logger.info('"otherProducts" was successfully seeded.');
    return createdOtherProducts;
  } catch (error) {
    logger.error('Failed to seed "otherProducts".', error);
    process.exit(1);
  }
}
