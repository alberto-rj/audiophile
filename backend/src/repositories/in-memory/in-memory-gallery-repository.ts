import { paginate } from '@/helpers';
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

  async create(params: GalleryCreateParams) {
    const newItem = makeGallery(params);

    this.items.set(newItem.id, newItem);

    return newItem;
  }

  async findById({ id }: GalleryFindByIdParams) {
    const foundItem = this.items.get(id);

    if (typeof foundItem === 'undefined') {
      return null;
    }

    return foundItem;
  }

  async findMany({ page, limit }: GalleryFindManyParams) {
    const items = Array.from(this.items.values());

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: GalleryDeleteByIdParams) {
    let foundItem: Gallery | null = null;

    for (const [, gallery] of this.items.entries()) {
      if (gallery.id === id) {
        this.items.delete(gallery.id);
        foundItem = gallery;
      }
    }

    return foundItem;
  }

  async clear() {
    this.items.clear();
  }
}
