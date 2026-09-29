import {
  makeCartRepository,
  makeCategoryRepository,
  makeGalleryRepository,
  makeIncludeRepository,
  makeOrderRepository,
  makeOtherProductRepository,
  makeProductRepository,
  makeRefreshTokenRepository,
  makeUserRepository,
} from '@/helpers';
import type {
  CartRepository,
  CategoryRepository,
  GalleryRepository,
  IncludeRepository,
  OrderRepository,
  OtherProductRepository,
  ProductRepository,
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();

export const cartRepository: CartRepository = makeCartRepository();

export const categoryRepository: CategoryRepository = makeCategoryRepository();

export const includeRepository: IncludeRepository = makeIncludeRepository();

export const galleryRepository: GalleryRepository = makeGalleryRepository();

export const otherProductRepository: OtherProductRepository =
  makeOtherProductRepository();

export const productRepository: ProductRepository = makeProductRepository();

export const orderRepository: OrderRepository = makeOrderRepository();
