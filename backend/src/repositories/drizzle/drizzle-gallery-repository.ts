import { db, galleries, type Gallery as RawGallery } from '@/db/drizzle';
import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import type { GalleryRepository } from '@/repositories';
import {
  type Gallery,
  type GalleryCreateParams,
  type GalleryDeleteByIdParams,
  type GalleryFindByIdParams,
  type GalleryFindManyParams,
} from '@/schemas';
import { count, eq } from 'drizzle-orm';

function toItem(item: RawGallery): Gallery {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleGalleryRepository implements GalleryRepository {
  async create(params: GalleryCreateParams): Promise<Gallery> {
    const [createdItem] = await db.insert(galleries).values(params).returning();

    return toItem(createdItem!);
  }

  async createMany(paramsList: GalleryCreateParams[]): Promise<Gallery[]> {
    const createdItems = await db
      .insert(galleries)
      .values(paramsList)
      .returning();

    return createdItems.map(toItem);
  }

  async findById({ id }: GalleryFindByIdParams): Promise<Gallery | null> {
    const [foundItem] = await db
      .select()
      .from(galleries)
      .where(eq(galleries.id, id));

    if (!foundItem) {
      return null;
    }

    return toItem(foundItem);
  }

  async findMany({
    page,
    limit,
  }: GalleryFindManyParams): Promise<PaginateResult<Gallery>> {
    const [foundItems, [totalItemsResult]] = await Promise.all([
      db
        .select()
        .from(galleries)
        .limit(limit)
        .offset(getOffset({ limit, page })),
      db.select({ totalItems: count() }).from(galleries),
    ]);

    const totalItems = totalItemsResult!.totalItems;
    const result = getBaseResult({ limit, page, totalItems });

    return {
      ...result,
      items: foundItems.map(toItem),
    };
  }

  async deleteById({ id }: GalleryDeleteByIdParams): Promise<Gallery | null> {
    const [deletedItem] = await db
      .delete(galleries)
      .where(eq(galleries.id, id));

    if (!deletedItem) {
      return null;
    }

    return toItem(deletedItem);
  }

  async clear(): Promise<void> {
    await db.delete(galleries);
  }
}
