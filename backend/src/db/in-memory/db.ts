import type {
  Category,
  CategoryId,
  Gallery,
  GalleryId,
  Include,
  IncludeId,
  OtherProduct,
  Product,
  ProductId,
  RefreshToken,
  RefreshTokenId,
  User,
  UserId,
} from '@/schemas';

export const db = {
  categories: new Map<CategoryId, Category>(),
  galleries: new Map<GalleryId, Gallery>(),
  includes: new Map<IncludeId, Include>(),
  otherProducts: new Map<ProductId, OtherProduct>(),
  products: new Map<ProductId, Product>(),
  refreshTokens: new Map<RefreshTokenId, RefreshToken>(),
  users: new Map<UserId, User>(),
} as const;
