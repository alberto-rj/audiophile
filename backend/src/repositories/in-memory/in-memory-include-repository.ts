import { paginate } from '@/helpers';
import type { IncludeRepository } from '@/repositories';
import {
  makeInclude,
  type Include,
  type IncludeCreateParams,
  type IncludeDeleteByIdParams,
  type IncludeFindByIdParams,
  type IncludeFindManyParams,
} from '@/schemas';

export class InMemoryIncludeRepository implements IncludeRepository {
  private items: Map<number, Include>;

  constructor() {
    this.items = new Map();
  }

  async create(params: IncludeCreateParams) {
    const newItem = makeInclude(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: IncludeCreateParams[]): Promise<Include[]> {
    const newItems = paramsList.map(makeInclude);

    for (const newItem of newItems) {
      this.items.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({ id }: IncludeFindByIdParams) {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({ page, limit }: IncludeFindManyParams) {
    const items = Array.from(this.items.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: IncludeDeleteByIdParams) {
    let foundItem: Include | null = null;

    for (const [, include] of this.items.entries()) {
      if (include.id === id) {
        this.items.delete(include.id);
        foundItem = include;
      }
    }

    return foundItem;
  }

  async clear() {
    this.items.clear();
  }
}
