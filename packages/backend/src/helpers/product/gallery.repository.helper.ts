import { DrizzleGalleryRepository } from '@/repositories/drizzle';
import { InMemoryGalleryRepository } from '@/repositories/in-memory';
import type { GalleryRepository } from '@/repositories/types';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

export function makeGalleryRepository(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<RepositoryType, GalleryRepository> = {
    drizzle: new DrizzleGalleryRepository(),
    'in-memory': new InMemoryGalleryRepository(),
  };

  return repositories[type];
}
