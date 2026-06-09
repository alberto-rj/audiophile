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
} from './common/common.schema';
export type { ResponsiveImage, Pagination } from './common/common.types';

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
  ApiCategorySchema,
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySchema,
  CategorySlugSchema,
  CategoryCreateParamsSchema,
  CategoryDeleteByIdParamsSchema,
  CategoryDeleteBySlugParamsSchema,
  CategoryFindByIdParamsSchema,
  CategoryFindBySlugParamsSchema,
  CategoryUpdateParamsSchema,
} from './category/category.schema';
export type {
  ApiCategory,
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
  makeCategoryUpdateParams,
} from './category/category.helpers';

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
  ApiIncludeSchema,
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
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
  ApiGallery,
  Gallery,
  GalleryId,
  GalleryImage,
  ApiInclude,
  Include,
  IncludeItem,
  IncludeQuantity,
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
