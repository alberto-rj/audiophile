import type {
  Category,
  CategoryCreateParams,
  CategoryFindManyParams,
  CategoryIdParams,
  CategorySlugParams,
  CategoryUpdateParams,
} from '@audiophile/shared';
import { count, eq } from 'drizzle-orm';

import { db, categories, type Category as DrizzleCategory } from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type { CategoryRepository } from '@/repositories';

function toCategory(category: DrizzleCategory): Category {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...categoryWithoutTimestamp } = category;

  return categoryWithoutTimestamp;
}

export class DrizzleCategoryRepository implements CategoryRepository {
  async create(params: CategoryCreateParams): Promise<Category> {
    const [createdCategory] = await db
      .insert(categories)
      .values(params)
      .returning();

    return toCategory(createdCategory!);
  }

  async createMany(params: CategoryCreateParams[]): Promise<Category[]> {
    const createdCategories = await db
      .insert(categories)
      .values(params)
      .returning();

    return createdCategories.map(toCategory);
  }

  async update({
    id,
    ...changes
  }: CategoryUpdateParams): Promise<Category | null> {
    const [updatedCategory] = await db
      .update(categories)
      .set(changes)
      .where(eq(categories.id, id))
      .returning();

    if (!updatedCategory) {
      return null;
    }

    return toCategory(updatedCategory);
  }

  async findBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const [foundCategory] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (!foundCategory) {
      return null;
    }

    return toCategory(foundCategory);
  }

  async findById({ id }: CategoryIdParams): Promise<Category | null> {
    const [foundCategory] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!foundCategory) {
      return null;
    }

    return toCategory(foundCategory);
  }

  async findMany({
    page,
    limit,
  }: CategoryFindManyParams): Promise<PaginateResult<Category>> {
    const [foundCategories, [countResult]] = await Promise.all([
      db
        .select()
        .from(categories)
        .limit(limit)
        .offset(getOffset({ limit, page })),
      db.select({ totalCount: count() }).from(categories),
    ]);

    const totalItems = countResult!.totalCount;
    const result = getBaseResult({
      page: page,
      limit: limit,
      totalItems,
    });

    return {
      ...result,
      items: foundCategories.map(toCategory),
    };
  }

  async deleteById({ id }: CategoryIdParams): Promise<Category | null> {
    const [deletedCategory] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!deletedCategory) {
      return null;
    }

    return toCategory(deletedCategory);
  }

  async deleteBySlug({ slug }: CategorySlugParams): Promise<Category | null> {
    const [deletedCategory] = await db
      .delete(categories)
      .where(eq(categories.slug, slug))
      .returning();

    if (!deletedCategory) {
      return null;
    }

    return toCategory(deletedCategory);
  }

  async clear() {
    await db.delete(categories);
  }
}
