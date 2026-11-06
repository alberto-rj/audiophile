import { GallerySeeder } from '@/db/seeds/product';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeGalleryRepository } from './gallery.repository.helper';

export function makeGallerySeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const galleryRepository = makeGalleryRepository(type);

  return {
    galleryRepository,
    seeder: new GallerySeeder(galleryRepository),
  };
}
