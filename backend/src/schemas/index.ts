export { ApiLoginBodySchema, type ApiLoginBody } from './auth/login.schema';
export {
  ApiRegisterBodySchema,
  type ApiRegisterBody,
} from './auth/register.schema';
export {
  ApiAuthResponseSchema,
  type ApiAuthResponse,
} from './auth/auth-response.schema';

export {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySchema,
  CategorySlugSchema,
} from './category/category.schema';
export type {
  Category,
  CategoryDescription,
  CategoryId,
  CategoryImage,
  CategoryName,
  CategorySlug,
} from './category/category.types';

export {
  ApiErrorResponseSchema,
  ApiErrorSchema,
  ApiPaginationSchema,
  ApiResultListResponse,
  ApiValidationErrorResponseSchema,
  CreatedAtSchema,
  ImageSchema,
  LimitSchema,
  makeApiPaginatedResponseSchema,
  makeApiResultListResponseSchema,
  makeApiResultResponseSchema,
  makeApiValidationErrorResponseSchema,
  PageSchema,
  ResponsiveImageSchema,
  UpdatedAtSchema,
} from './common';

export {
  ApiGallerySchema,
  GalleryIdSchema,
  GallerySchema,
} from './product/gallery.schema';
export type { ApiGallery, Gallery, GalleryId } from './product/gallery.types';
export {
  ApiIncludeSchema,
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './product/include.schema';
export type {
  ApiInclude,
  Include,
  IncludeItem,
  IncludeQuantity,
} from './product/include.types';
export {
  ApiProductSchema,
  ProductBaseSchema,
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSchema,
  ProductSlugSchema,
} from './product/product.schema';
export type {
  ApiProduct,
  Product,
  ProductBase,
  ProductDescription,
  ProductFeatures,
  ProductId,
  ProductIsNew,
  ProductName,
  ProductPrice,
  ProductSlug,
} from './product/product.types';

export { type RefreshToken } from './refresh-token/refresh-token.types';

export {
  ApiUpdateProfileBodySchema,
  type ApiUpdateProfileBody,
} from './user/update-profile.schema';
export { ApiUserResponseSchema } from './user/user-response.schema';
export {
  ApiUserCreateBodySchema,
  ApiUserSchema,
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
  UserPasswordSchema,
} from './user/user.schema';
export type {
  BaseUser,
  User,
  SafeUser,
  UserEmail,
  UserId,
  UserCreatedAt,
  UserName,
  UserPassword,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserUpdateParams,
} from './user/user.types';
