import { makeCategory, type Category } from '@/schemas';

import type { CategoryRepository } from '@/repositories';
import type {
  CategoryCreateParams,
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryFindManyParams,
  CategoryUpdateParams,
} from '@/schemas/category/category.types';

export class InMemoryCategoryRepository implements CategoryRepository {
  private items: Map<number, Category>;

  constructor() {
    this.items = new Map();
  }

  async create(params: CategoryCreateParams) {
    const newItem = makeCategory(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async update(params: CategoryUpdateParams) {
    const newItem = makeCategory(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async findBySlug({ slug }: CategoryFindBySlugParams) {
    for (const [, category] of this.items.entries()) {
      if (category.slug === slug) {
        return category;
      }
    }

    return null;
  }

  async findById({ id }: CategoryFindByIdParams) {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({ page, limit }: CategoryFindManyParams) {
    const items = Array.from(this.items.values());
    const start = (page - 1) * limit;
    const end = start + limit;

    const foundItems = items.slice(start, end);

    return foundItems;
  }

  async deleteById({ id }: CategoryDeleteByIdParams) {
    let foundItem = null;

    for (const [, category] of this.items.entries()) {
      if (category.id === id) {
        foundItem = category;
      }
    }

    return foundItem;
  }

  async deleteBySlug({ slug }: CategoryDeleteBySlugParams) {
    let foundItem = null;

    for (const [, category] of this.items.entries()) {
      if (category.slug === slug) {
        foundItem = category;
      }
    }

    return foundItem;
  }

  async clear() {
    this.items.clear();
  }
}
