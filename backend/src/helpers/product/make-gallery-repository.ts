import {
  InMemoryGalleryRepository,
  type GalleryRepository,
} from '@/repositories';

type GalleryRepositoryType = 'pg' | 'in-memory' | 'default';

export function makeGalleryRepository(type: GalleryRepositoryType = 'default') {
  const repositories: Record<GalleryRepositoryType, GalleryRepository> = {
    'in-memory': new InMemoryGalleryRepository(),
    pg: new InMemoryGalleryRepository(),
    default: new InMemoryGalleryRepository(),
  };

  return repositories[type];
}
