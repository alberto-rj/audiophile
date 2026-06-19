import { paginate, type PaginateResult } from '@/helpers';
import type { IncludeRepository } from '@/repositories';
import { makeInclude } from '@/schemas';
import type {
  Include,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from '@/schemas';

export class InMemoryIncludeRepository implements IncludeRepository {
  private items: Map<number, Include>;

  constructor() {
    this.items = new Map();
  }

  async create(params: IncludeCreateParams): Promise<Include> {
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

  async findById({ id }: IncludeFindByIdParams): Promise<Include | null> {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: IncludeFindManyParams): Promise<PaginateResult<Include>> {
    const items = Array.from(this.items.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: IncludeDeleteByIdParams): Promise<Include | null> {
    let foundItem: Include | null = null;

    for (const [, include] of this.items.entries()) {
      if (include.id === id) {
        this.items.delete(include.id);
        foundItem = include;
      }
    }

    return foundItem;
  }

  async clear(): Promise<void> {
    this.items.clear();
  }
}
