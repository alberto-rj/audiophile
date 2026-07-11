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

export { ApiCartItemSchema } from './cart/cart-item.api.schema';
export type { ApiCartItem } from './cart/cart-item.api.types';
export {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart/cart-item.base.schema';
export {
  CartItemSchema,
  CartItemDetailedSchema,
} from './cart/cart-item.schema';
export type {
  CartItem,
  CartItemDetailed,
  CartItemId,
  CartItemQuantity,
} from './cart/cart-item.types';
export {
  ApiCartAddItemBodySchema,
  ApiCartIdParamsSchema,
  ApiCartPaginationQuerySchema,
  ApiCartSchema,
  ApiCartUpdateItemBodySchema,
} from './cart/cart.api.schema';
export type {
  ApiCart,
  ApiCartAddItemBody,
  ApiCartIdParams,
  ApiCartPaginationQuery,
  ApiCartUpdateItemBody,
} from './cart/cart.api.types';
export {
  CartGrandTotalSchema,
  CartIdSchema,
  CartShippingSchema,
  CartSubtotalSchema,
  CartVatSchema,
} from './cart/cart.base.schema';
export {
  CartAddItemParamsSchema,
  CartFindManyItemsParamsSchema,
  CartFindParamsSchema,
  CartRemoveItemParamsSchema,
  CartRemoveAllParamsSchema,
  CartUpdateItemParamsSchema,
} from './cart/cart.params.schema';
export type {
  CartAddItemParams,
  CartFindManyItemsParams,
  CartFindParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartUpdateItemParams,
} from './cart/cart.params.types';
export { CartSchema, CartDetailedSchema } from './cart/cart.schema';
export type { Cart, CartDetailed, CartId } from './cart/cart.types';

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
  makeCategoryUpdateParams,
} from './category/category.helpers';

export {
  GalleryIdSchema,
  GalleryImageSchema,
} from './product/gallery.base.schema';
export {
  makeGallery,
  makeGalleryCreateParams,
  makeGalleryDeleteByIdParams,
  makeGalleryFindByIdParams,
  makeGalleryFindManyParams,
} from './product/gallery.helpers';
export {
  ApiGalleryCreateBodySchema,
  ApiGalleryIdParamsSchema,
  ApiGalleryPaginationQuerySchema,
  ApiGallerySchema,
} from './product/gallery.api.schema';
export type { ApiGallery } from './product/gallery.api.types';
export { GallerySchema } from './product/gallery.schema';
export type {
  Gallery,
  GalleryCreateParams,
  GalleryDeleteByIdParams,
  GalleryFindByIdParams,
  GalleryFindManyParams,
  GalleryId,
  GalleryImage,
} from './product/gallery.types';
export {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './product/include.base.schema';
export {
  makeInclude,
  makeIncludeCreateParams,
  makeIncludeDeleteByIdParams,
  makeIncludeFindByIdParams,
  makeIncludeFindManyParams,
} from './product/include.helpers';
export {
  ApiIncludeCreateBodySchema,
  ApiIncludeIdParamsSchema,
  ApiIncludePaginationQuerySchema,
  ApiIncludeSchema,
} from './product/include.api.schema';
export type { ApiInclude } from './product/include.api.types';
export { IncludeSchema } from './product/include.schema';
export type {
  Include,
  IncludeItem,
  IncludeQuantity,
  IncludeId,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from './product/include.types';
export {
  makeOtherProduct,
  makeOtherProductCreateParams,
} from './product/other-product.helpers';
export {
  OtherProductCreateParamsSchema,
  OtherProductSchema,
} from './product/other-product.schema';
export type {
  OtherProduct,
  OtherProductCreateParams,
  OtherProductId,
} from './product/other-product.types';
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
  ApiProductCreateBodySchema,
  ApiProductFindManyQuerySchema,
  ApiProductIdParamsSchema,
  ApiProductSlugParamsSchema,
} from './product/product.api.schema';
export type {
  ApiProduct,
  ApiProductIdParams,
  ApiProductSlugParams,
} from './product/product.api.types';
export {
  ProductBaseSchema,
  ProductSchema,
  ProductDetailedSchema,
} from './product/product.schema';
export {
  makeProduct,
  makeProductCreateParams,
  makeProductDeleteByIdParams,
  makeProductDeleteBySlugParams,
  makeProductFindByIdParams,
  makeProductFindBySlugParams,
  makeProductFindManyParams,
} from './product/product.helpers';
export type {
  Product,
  ProductBase,
  ProductDescription,
  ProductDetailed,
  ProductFeatures,
  ProductId,
  ProductIsNew,
  ProductName,
  ProductPrice,
  ProductSlug,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductDeleteBySlugParams,
  ProductFindByIdParams,
  ProductFindBySlugParams,
  ProductFindManyParams,
} from './product/product.types';

export {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token/refresh-token.base.schema';
export type {
  RefreshToken,
  RefreshTokenExpiresAt,
  RefreshTokenId,
  RefreshTokenToken,
} from './refresh-token/refresh-token.types';

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
