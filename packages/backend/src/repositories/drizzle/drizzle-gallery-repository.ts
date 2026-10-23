import type {
  Gallery,
  GalleryCreateParams,
  GalleryFindManyParams,
  GalleryIdParams,
} from '@audiophile/shared';
import { count, eq } from 'drizzle-orm';

import { db, galleries, type Gallery as DrizzleGallery } from '@/db/drizzle';
import {
  getBaseResult,
  getOffset,
  type PaginateResult,
} from '@/helpers/paginate';

import type { GalleryRepository } from '../types/gallery-repository.types';

function toGallery(gallery: DrizzleGallery): Gallery {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...galleryWithoutTimestamp } = gallery;

  return galleryWithoutTimestamp;
}

export class DrizzleGalleryRepository implements GalleryRepository {
  async create(params: GalleryCreateParams): Promise<Gallery> {
    const [createdGallery] = await db
      .insert(galleries)
      .values(params)
      .returning();

    return toGallery(createdGallery!);
  }

  async createMany(paramsList: GalleryCreateParams[]): Promise<Gallery[]> {
    const createdGalleries = await db
      .insert(galleries)
      .values(paramsList)
      .returning();

    return createdGalleries.map(toGallery);
  }

  async findById({ id }: GalleryIdParams): Promise<Gallery | null> {
    const [foundGallery] = await db
      .select()
      .from(galleries)
      .where(eq(galleries.id, id));

    if (!foundGallery) {
      return null;
    }

    return toGallery(foundGallery);
  }

  async findMany({
    page,
    limit,
  }: GalleryFindManyParams): Promise<PaginateResult<Gallery>> {
    const [foundGallery, [totalGalleriesResult]] = await Promise.all([
      db
        .select()
        .from(galleries)
        .limit(limit)
        .offset(getOffset({ limit, page })),
      db.select({ totalItems: count() }).from(galleries),
    ]);

    const totalItems = totalGalleriesResult!.totalItems;
    const result = getBaseResult({ limit, page, totalItems });

    return {
      ...result,
      items: foundGallery.map(toGallery),
    };
  }

  async deleteById({ id }: GalleryIdParams): Promise<Gallery | null> {
    const [deletedGalleries] = await db
      .delete(galleries)
      .where(eq(galleries.id, id));

    if (!deletedGalleries) {
      return null;
    }

    return toGallery(deletedGalleries);
  }

  async clear(): Promise<void> {
    await db.delete(galleries);
  }
}
