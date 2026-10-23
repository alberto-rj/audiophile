import { makeCartRepository } from '@/helpers/cart';
import { makeCategoryRepository } from '@/helpers/category';
import { makeOrderRepository } from '@/helpers/order';
import {
  makeIncludeRepository,
  makeGalleryRepository,
  makeSuggestionRepository,
  makeProductRepository,
} from '@/helpers/product';
import { makeRefreshTokenRepository } from '@/helpers/refresh-token';
import { makeUserRepository } from '@/helpers/user';
import type {
  UserRepository,
  RefreshTokenRepository,
  CartRepository,
  CategoryRepository,
  IncludeRepository,
  GalleryRepository,
  SuggestionRepository,
  ProductRepository,
  OrderRepository,
} from '@/repositories/types';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();

export const cartRepository: CartRepository = makeCartRepository();

export const categoryRepository: CategoryRepository = makeCategoryRepository();

export const includeRepository: IncludeRepository = makeIncludeRepository();

export const galleryRepository: GalleryRepository = makeGalleryRepository();

export const suggestionRepository: SuggestionRepository =
  makeSuggestionRepository();

export const productRepository: ProductRepository = makeProductRepository();

export const orderRepository: OrderRepository = makeOrderRepository();
