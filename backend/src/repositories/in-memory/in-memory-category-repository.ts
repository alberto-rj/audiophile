import { db } from '@/db/in-memory';
import { makeCategory, paginate, type PaginateResult } from '@/helpers';
import type {
  Category,
  CategoryCreateParams,
  CategoryFindManyParams,
  CategoryIdParams,
  CategorySlugParams,
  CategoryUpdateParams,
} from '@/schemas';

import type { CategoryRepository } from '../types/category-repository.types';

export class InMemoryCategoryRepository implements CategoryRepository {
  async create(params: CategoryCreateParams): Promise<Category> {
    const newItem = makeCategory(params);

    db.categories.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(params: CategoryCreateParams[]): Promise<Category[]> {
    const newItems = params.map(makeCategory);

    for (const newItem of newItems) {
      db.categories.set(newItem.id, newItem);
    }

    return newItems;
  }

  async update({
    id,
    ...changes
  }: CategoryUpdateParams): Promise<Category | null> {
    const foundItem = db.categories.get(id);

    if (!foundItem) {
      return null;
    }

    const newItem = {
      ...foundItem,
      ...changes,
    };

    db.categories.set(id, newItem);

    return newItem;
  }

  async findById({ id }: CategoryIdParams): Promise<Category | null> {
    const foundItem = db.categories.get(id);

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const foundItem = Array.from(db.categories.values()).find(
      (item) => item.slug === slug,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: CategoryFindManyParams): Promise<PaginateResult<Category>> {
    const items = Array.from(db.categories.values());

    const foundItems = paginate({ items, page, limit });

    return foundItems;
  }

  async deleteById({ id }: CategoryIdParams): Promise<Category | null> {
    const foundItem = Array.from(db.categories.values()).find(
      (item) => item.id === id,
    );

    if (!foundItem) {
      return null;
    }

    db.categories.delete(foundItem.id);

    return foundItem;
  }

  async deleteBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const foundItem = Array.from(db.categories.values()).find(
      (item) => item.slug === slug,
    );

    if (!foundItem) {
      return null;
    }

    db.categories.delete(foundItem.id);

    return foundItem;
  }

  async clear(): Promise<void> {
    db.categories.clear();
  }
}
