import {
  makeCategory,
  type Category,
  type CategoryCreateParams,
  type CategoryDeleteByIdParams,
  type CategoryDeleteBySlugParams,
  type CategoryFindByIdParams,
  type CategoryFindBySlugParams,
  type CategoryFindManyParams,
  type CategoryUpdateParams,
} from '@/schemas';
import type { CategoryRepository } from '@/repositories';
import { paginate, type PaginateResult } from '@/helpers';

export class InMemoryCategoryRepository implements CategoryRepository {
  private items: Map<number, Category>;

  constructor() {
    this.items = new Map();
  }

  async create(params: CategoryCreateParams): Promise<Category> {
    const newItem = makeCategory(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(params: CategoryCreateParams[]): Promise<Category[]> {
    const newItems = params.map(makeCategory);

    for (const newItem of newItems) {
      this.items.set(newItem.id, newItem);
    }

    return newItems;
  }

  async update({
    id,
    ...changes
  }: CategoryUpdateParams): Promise<Category | null> {
    const foundItem = this.items.get(id);

    if (!foundItem) {
      return null;
    }

    const newItem = {
      ...foundItem,
      ...changes,
    };

    this.items.set(id, newItem);

    return newItem;
  }

  async findBySlug({
    slug,
  }: CategoryFindBySlugParams): Promise<Category | null> {
    for (const [, category] of this.items.entries()) {
      if (category.slug === slug) {
        return category;
      }
    }

    return null;
  }

  async findById({ id }: CategoryFindByIdParams): Promise<Category | null> {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: CategoryFindManyParams): Promise<PaginateResult<Category>> {
    const items = Array.from(this.items.values());

    const foundItems = paginate({ items, page, limit });

    return foundItems;
  }

  async deleteById({ id }: CategoryDeleteByIdParams): Promise<Category | null> {
    let foundItem = null;

    for (const [, category] of this.items.entries()) {
      if (category.id === id) {
        this.items.delete(category.id);
        foundItem = category;
      }
    }

    return foundItem;
  }

  async deleteBySlug({
    slug,
  }: CategoryDeleteBySlugParams): Promise<Category | null> {
    let foundItem = null;

    for (const [, category] of this.items.entries()) {
      if (category.slug === slug) {
        this.items.delete(category.id);
        foundItem = category;
      }
    }

    return foundItem;
  }

  async clear(): Promise<void> {
    this.items.clear();
  }
}
