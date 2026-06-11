import {
  makeCategoryRepository,
  makeGalleryRepository,
  makeIncludeRepository,
  makeRefreshTokenRepository,
  makeUserRepository,
} from '@/helpers';
import type {
  CategoryRepository,
  GalleryRepository,
  IncludeRepository,
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();

export const categoryRepository: CategoryRepository = makeCategoryRepository();

export const includeRepository: IncludeRepository = makeIncludeRepository();

export const galleryRepository: GalleryRepository = makeGalleryRepository();
