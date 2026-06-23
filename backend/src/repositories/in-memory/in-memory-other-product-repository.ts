import { db } from '@/db/in-memory';
import {
  makeOtherProduct,
  type OtherProduct,
  type OtherProductCreateParams,
} from '@/schemas';

import type { OtherProductRepository } from '../types/other-product-repository.types';

export class InMemoryOtherProductRepository implements OtherProductRepository {
  async create(params: OtherProductCreateParams): Promise<OtherProduct> {
    const createdItem = makeOtherProduct(params);

    db.otherProducts.set(createdItem.otherId, createdItem);

    return createdItem;
  }

  async createMany(
    paramsList: OtherProductCreateParams[],
  ): Promise<OtherProduct[]> {
    const createdItems = paramsList.map(makeOtherProduct);

    for (const item of createdItems) {
      db.otherProducts.set(item.otherId, item);
    }

    return createdItems;
  }

  async clear(): Promise<void> {
    db.otherProducts.clear();
  }
}
