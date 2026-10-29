import {
  makeCategory,
  type Category,
  type CategoryCreateParams,
  type CategoryFindManyParams,
  type CategoryIdParams,
  type CategorySlugParams,
  type CategoryUpdateParams,
} from '@audiophile/shared';

import { db } from '@/db/in-memory';
import { paginate, type PaginateResult } from '@/helpers/paginate';

import type { CategoryRepository } from '../types/category-repository.types';

export class InMemoryCategoryRepository implements CategoryRepository {
  async create(params: CategoryCreateParams): Promise<Category> {
    const createdCategory = makeCategory(params);

    db.categories.set(createdCategory.id, createdCategory);

    return createdCategory;
  }

  async createMany(params: CategoryCreateParams[]): Promise<Category[]> {
    const createdCategories = params.map(makeCategory);

    for (const newCategory of createdCategories) {
      db.categories.set(newCategory.id, newCategory);
    }

    return createdCategories;
  }

  async update({
    id,
    ...changes
  }: CategoryUpdateParams): Promise<Category | null> {
    const foundCategory = db.categories.get(id);

    if (!foundCategory) {
      return null;
    }

    const newCategory = {
      ...foundCategory,
      ...changes,
    };

    db.categories.set(id, newCategory);

    return newCategory;
  }

  async findById({ id }: CategoryIdParams): Promise<Category | null> {
    const foundCategory = db.categories.get(id);

    if (!foundCategory) {
      return null;
    }

    return foundCategory;
  }

  async findBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const foundCategory = Array.from(db.categories.values()).find(
      (item) => item.slug === slug,
    );

    if (!foundCategory) {
      return null;
    }

    return foundCategory;
  }

  async findMany({
    page,
    limit,
  }: CategoryFindManyParams): Promise<PaginateResult<Category>> {
    const categoryItems = Array.from(db.categories.values());

    const categoryPaginationResult = paginate({
      items: categoryItems,
      page,
      limit,
    });

    return categoryPaginationResult;
  }

  async deleteById({ id }: CategoryIdParams): Promise<Category | null> {
    const foundCategory = Array.from(db.categories.values()).find(
      (item) => item.id === id,
    );

    if (!foundCategory) {
      return null;
    }

    db.categories.delete(foundCategory.id);

    return foundCategory;
  }

  async deleteBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const foundCategory = Array.from(db.categories.values()).find(
      (category) => category.slug === slug,
    );

    if (!foundCategory) {
      return null;
    }

    db.categories.delete(foundCategory.id);

    return foundCategory;
  }

  async clear(): Promise<void> {
    db.categories.clear();
  }
}
