export type { ResponsiveImageType } from './image';

export type { BasicProduct, GalleryImages, ItemInclude } from './product';

export type {
  CategoryContent,
  FeatureHighLightedContent,
  FeatureLandscapeContent,
  FeaturePortraitContent,
  FeaturesSectionContent,
  GalleryContent,
  InTheBoxSectionContent,
  ProductCardContent,
  ProductDetailedCardContent,
  SuggestionCardContent,
} from './content';

/* cart */
export type {
  AddCartItemPayload,
  Cart,
  CartItem,
  CartResponse,
  RemoveCartItemPayload,
  UpdateCartItemQuantityPayload,
} from './cart';

/* order */
export type {
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  CreateOrderPayload,
  OrderResponse,
  OrderListResponse,
} from './order';

export type ApiError = { status?: number };

/* auth */
export type {
  AuthResponse,
  AuthState,
  LoginPayload,
  RegisterPayload,
} from './auth';

/* user */
export type { BaseUser, ProfileResponse, UpdateProfilePayload } from './user';
