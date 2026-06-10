export {
  ApiErrorResponseSchema,
  ApiErrorSchema,
  ApiPaginationQuerySchema,
  ApiResultListResponse,
  ApiValidationErrorResponseSchema,
  CreatedAtSchema,
  ImageSchema,
  LimitSchema,
  makeApiPaginationResponseSchema,
  makeApiResultListResponseSchema,
  makeApiResultResponseSchema,
  makeApiValidationErrorResponseSchema,
  PageSchema,
  ResponsiveImageSchema,
  UpdatedAtSchema,
} from './common/common.schema';
export type {
  ApiPaginationQuery,
  ApiPaginationResponse,
  ResponsiveImage,
} from './common/common.types';

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
  ApiCategoryCreateBodySchema,
  ApiCategoryIdParamsSchema,
  ApiCategoryPaginationQuerySchema,
  ApiCategorySchema,
  ApiCategorySlugParamsSchema,
  ApiCategoryUpdateBodySchema,
} from './category/category.api.schema';
export type {
  ApiCategory,
  ApiCategoryCreateBody,
  ApiCategoryIdParams,
  ApiCategoryPaginationQuery,
  ApiCategorySlugParams,
  ApiCategoryUpdateBody,
} from './category/category.api.types';
export {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category/category.base.schema';
export { CategorySchema } from './category/category.schema';

export type {
  Category,
  CategoryDescription,
  CategoryId,
  CategoryImage,
  CategoryName,
  CategorySlug,
  CategoryCreateParams,
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryFindManyParams,
  CategoryUpdateParams,
} from './category/category.types';
export {
  makeCategory,
  makeCategoryCreateParams,
  makeCategoryDeleteByIdParams,
  makeCategoryDeleteBySlugParams,
  makeCategoryFindByIdParams,
  makeCategoryFindBySlugParams,
  makeCategoryFindManyParams,
  makeCategoryUpdateBody,
} from './category/category.helpers';

export {
  GalleryIdSchema,
  GalleryImageSchema,
} from './product/gallery.base.schema';
export { ApiGallerySchema, GallerySchema } from './product/gallery.schema';
export type {
  ApiGallery,
  Gallery,
  GalleryId,
  GalleryImage,
} from './product/gallery.types';
export {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './product/include.base.schema';
export { ApiIncludeSchema, IncludeSchema } from './product/include.schema';
export type {
  ApiInclude,
  Include,
  IncludeItem,
  IncludeQuantity,
} from './product/include.types';
export {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product/product.base.schema';
export {
  ApiProductSchema,
  ProductBaseSchema,
  ProductSchema,
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
