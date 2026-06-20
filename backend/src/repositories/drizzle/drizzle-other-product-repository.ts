import {
  db,
  otherProducts,
  type OtherProduct as DrizzleOtherProduct,
} from '@/db/drizzle';
import type { OtherProduct, OtherProductCreateParams } from '@/schemas';

import type { OtherProductRepository } from '../types/other-product-repository.types';

function toItem(item: DrizzleOtherProduct) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleOtherProductRepository implements OtherProductRepository {
  async create(params: OtherProductCreateParams): Promise<OtherProduct> {
    const [createdItem] = await db
      .insert(otherProducts)
      .values(params)
      .returning();

    return toItem(createdItem!);
  }

  async createMany(
    params: OtherProductCreateParams[],
  ): Promise<OtherProduct[]> {
    const createdItems = await db
      .insert(otherProducts)
      .values(params)
      .returning();

    return createdItems.map(toItem);
  }

  async clear(): Promise<void> {
    await db.delete(otherProducts);
  }
}
