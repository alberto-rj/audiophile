import { count, eq } from 'drizzle-orm';

import { db, categories, type Category as RawCategory } from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type {
  Category,
  CategoryCreateParams,
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryFindManyParams,
  CategoryUpdateParams,
} from '@/schemas';
import type { CategoryRepository } from '@/repositories';

function parseItem(rawItem: RawCategory): Category {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = rawItem;

  return itemWithoutTimestamp;
}

export class DrizzleCategoryRepository implements CategoryRepository {
  async create(params: CategoryCreateParams): Promise<Category> {
    const [createdItem] = await db
      .insert(categories)
      .values(params)
      .returning();

    return parseItem(createdItem!);
  }

  async createMany(params: CategoryCreateParams[]): Promise<Category[]> {
    const createdItems = await db.insert(categories).values(params).returning();

    return createdItems.map(parseItem);
  }

  async update({
    id,
    ...changes
  }: CategoryUpdateParams): Promise<Category | null> {
    const [updatedItem] = await db
      .update(categories)
      .set(changes)
      .where(eq(categories.id, id))
      .returning();

    if (!updatedItem) {
      return null;
    }

    return parseItem(updatedItem);
  }

  async findBySlug({
    slug,
  }: CategoryFindBySlugParams): Promise<Category | null> {
    const [foundItem] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (!foundItem) {
      return null;
    }

    return parseItem(foundItem);
  }

  async findById({ id }: CategoryFindByIdParams): Promise<Category | null> {
    const [foundItem] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!foundItem) {
      return null;
    }

    return parseItem(foundItem);
  }

  async findMany({
    page,
    limit,
  }: CategoryFindManyParams): Promise<PaginateResult<Category>> {
    const [foundItems, [countResult]] = await Promise.all([
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
      items: foundItems.map(parseItem),
    };
  }

  async deleteById({ id }: CategoryDeleteByIdParams): Promise<Category | null> {
    const [deletedItem] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return parseItem(deletedItem);
  }

  async deleteBySlug({
    slug,
  }: CategoryDeleteBySlugParams): Promise<Category | null> {
    const [deletedItem] = await db
      .delete(categories)
      .where(eq(categories.slug, slug))
      .returning();

    if (!deletedItem) {
      return null;
    }

    return parseItem(deletedItem);
  }

  async clear() {
    await db.delete(categories);
  }
}
