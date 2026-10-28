import { DrizzleGalleryRepository } from '@/repositories/drizzle';
import { InMemoryGalleryRepository } from '@/repositories/in-memory';
import type { GalleryRepository } from '@/repositories/types';

type GalleryRepositoryType = 'drizzle' | 'in-memory';

export function makeGalleryRepository(type: GalleryRepositoryType = 'drizzle') {
  const repositories: Record<GalleryRepositoryType, GalleryRepository> = {
    drizzle: new DrizzleGalleryRepository(),
    'in-memory': new InMemoryGalleryRepository(),
  };

  return repositories[type];
}
