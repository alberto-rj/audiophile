import { db } from '@/db/in-memory';
import { paginate, type PaginateResult } from '@/helpers';
import { makeGallery } from '@/schemas';
import type {
  Gallery,
  GalleryCreateParams,
  GalleryDeleteByIdParams,
  GalleryFindByIdParams,
  GalleryFindManyParams,
} from '@/schemas';

import type { GalleryRepository } from '../types/gallery-repository.types';

export class InMemoryGalleryRepository implements GalleryRepository {
  async create(params: GalleryCreateParams): Promise<Gallery> {
    const newItem = makeGallery(params);

    db.galleries.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: GalleryCreateParams[]): Promise<Gallery[]> {
    const newItems = paramsList.map(makeGallery);

    for (const newItem of newItems) {
      db.galleries.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({ id }: GalleryFindByIdParams): Promise<Gallery | null> {
    const foundItem = db.galleries.get(id);

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: GalleryFindManyParams): Promise<PaginateResult<Gallery>> {
    const items = Array.from(db.galleries.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: GalleryDeleteByIdParams): Promise<Gallery | null> {
    const foundItem = Array.from(db.galleries.values()).find(
      (item) => item.id === id,
    );

    if (!foundItem) {
      return null;
    }

    db.galleries.delete(foundItem.id);

    return foundItem;
  }

  async clear(): Promise<void> {
    db.galleries.clear();
  }
}
