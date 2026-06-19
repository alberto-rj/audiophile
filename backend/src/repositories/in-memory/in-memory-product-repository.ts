import { paginate, type PaginateResult } from '@/helpers';
import type { ProductRepository } from '@/repositories';
import { makeProduct } from '@/schemas';
import type {
  Product,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductFindByIdParams,
  ProductFindManyParams,
} from '@/schemas';

export class InMemoryProductRepository implements ProductRepository {
  private items: Map<number, Product>;

  constructor() {
    this.items = new Map();
  }

  async create(params: ProductCreateParams): Promise<Product> {
    const newItem = makeProduct(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    const newItems = paramsList.map(makeProduct);

    for (const newItem of newItems) {
      this.items.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({ id }: ProductFindByIdParams): Promise<Product | null> {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: ProductFindManyParams): Promise<PaginateResult<Product>> {
    const items = Array.from(this.items.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: ProductDeleteByIdParams): Promise<Product | null> {
    let foundItem: Product | null = null;

    for (const [, product] of this.items.entries()) {
      if (product.id === id) {
        this.items.delete(product.id);
        foundItem = product;
      }
    }

    return foundItem;
  }

  async clear(): Promise<void> {
    this.items.clear();
  }
}
