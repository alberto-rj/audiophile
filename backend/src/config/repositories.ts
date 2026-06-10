import {
  makeCategoryRepository,
  makeRefreshTokenRepository,
  makeUserRepository,
} from '@/helpers';
import type {
  CategoryRepository,
  RefreshTokenRepository,
  UserRepository,
} from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();

export const refreshTokenRepository: RefreshTokenRepository =
  makeRefreshTokenRepository();

export const categoryRepository: CategoryRepository = makeCategoryRepository();
