import {
  DrizzleGalleryRepository,
  InMemoryGalleryRepository,
  type GalleryRepository,
} from '@/repositories';

type GalleryRepositoryType = 'drizzle' | 'in-memory';

export function makeGalleryRepository(type: GalleryRepositoryType = 'drizzle') {
  const repositories: Record<GalleryRepositoryType, GalleryRepository> = {
    'in-memory': new InMemoryGalleryRepository(),
    drizzle: new DrizzleGalleryRepository(),
  };

  return repositories[type];
}
