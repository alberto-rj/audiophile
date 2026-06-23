import { db } from '@/db/in-memory';
import { paginate, type PaginateResult } from '@/helpers';
import { makeInclude } from '@/schemas';
import type {
  Include,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from '@/schemas';

import type { IncludeRepository } from '../types/include-repository.types';

export class InMemoryIncludeRepository implements IncludeRepository {
  async create(params: IncludeCreateParams): Promise<Include> {
    const newItem = makeInclude(params);

    db.includes.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: IncludeCreateParams[]): Promise<Include[]> {
    const newItems = paramsList.map(makeInclude);

    for (const newItem of newItems) {
      db.includes.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({ id }: IncludeFindByIdParams): Promise<Include | null> {
    const foundItem = db.includes.get(id);

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: IncludeFindManyParams): Promise<PaginateResult<Include>> {
    const items = Array.from(db.includes.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: IncludeDeleteByIdParams): Promise<Include | null> {
    const foundItem = Array.from(db.includes.values()).find(
      (item) => item.id === id,
    );

    if (!foundItem) {
      return null;
    }

    db.includes.delete(foundItem.id);

    return foundItem;
  }

  async clear(): Promise<void> {
    db.includes.clear();
  }
}
