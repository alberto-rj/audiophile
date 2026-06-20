import {
  makeOtherProduct,
  type OtherProduct,
  type OtherProductCreateParams,
  type OtherProductId,
} from '@/schemas';

import type { OtherProductRepository } from '../types/other-product-repository.types';

export class InMemoryOtherProductRepository implements OtherProductRepository {
  private items: Map<OtherProductId, OtherProduct>;

  constructor() {
    this.items = new Map();
  }

  async create(params: OtherProductCreateParams): Promise<OtherProduct> {
    const createdItem = makeOtherProduct(params);

    this.items.set(createdItem.otherId, createdItem);

    return createdItem;
  }

  async createMany(
    paramsList: OtherProductCreateParams[],
  ): Promise<OtherProduct[]> {
    const createdItems = paramsList.map(makeOtherProduct);

    for (const item of createdItems) {
      this.items.set(item.otherId, item);
    }

    return createdItems;
  }

  async clear(): Promise<void> {
    this.items.clear();
  }
}
