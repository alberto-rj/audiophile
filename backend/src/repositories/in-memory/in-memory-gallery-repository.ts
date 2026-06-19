import { paginate, type PaginateResult } from '@/helpers';
import type { GalleryRepository } from '@/repositories';
import {
  makeGallery,
  type Gallery,
  type GalleryCreateParams,
  type GalleryDeleteByIdParams,
  type GalleryFindByIdParams,
  type GalleryFindManyParams,
} from '@/schemas';

export class InMemoryGalleryRepository implements GalleryRepository {
  private items: Map<number, Gallery>;

  constructor() {
    this.items = new Map();
  }

  async create(params: GalleryCreateParams): Promise<Gallery> {
    const newItem = makeGallery(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: GalleryCreateParams[]): Promise<Gallery[]> {
    const newItems = paramsList.map(makeGallery);

    for (const newItem of newItems) {
      this.items.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({ id }: GalleryFindByIdParams): Promise<Gallery | null> {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({
    page,
    limit,
  }: GalleryFindManyParams): Promise<PaginateResult<Gallery>> {
    const items = Array.from(this.items.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: GalleryDeleteByIdParams): Promise<Gallery | null> {
    let foundItem: Gallery | null = null;

    for (const [, gallery] of this.items.entries()) {
      if (gallery.id === id) {
        this.items.delete(gallery.id);
        foundItem = gallery;
      }
    }

    return foundItem;
  }

  async clear(): Promise<void> {
    this.items.clear();
  }
}
