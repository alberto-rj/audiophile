import {
  makeCategoryRepository,
  makeGalleryRepository,
  makeIncludeRepository,
  makeOtherProductRepository,
  makeProductRepository,
  makeRefreshTokenRepository,
  makeUserRepository,
} from '@/helpers';
import type {
  CategoryRepository,
  GalleryRepository,
  IncludeRepository,
  OtherProductRepository,
  ProductRepository,
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();

export const categoryRepository: CategoryRepository = makeCategoryRepository();

export const includeRepository: IncludeRepository = makeIncludeRepository();

export const galleryRepository: GalleryRepository = makeGalleryRepository();

export const otherProductRepository: OtherProductRepository =
  makeOtherProductRepository();

export const productRepository: ProductRepository = makeProductRepository();
