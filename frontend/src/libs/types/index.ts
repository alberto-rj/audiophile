export interface ResponsiveImageType {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ItemInclude {
  quantity: number;
  item: string;
}

export interface GalleryImages {
  first: ResponsiveImageType;
  second: ResponsiveImageType;
  third: ResponsiveImageType;
}

export interface Category {
  id: number;
  slug: string;
  image: string;
  name: string;
  description: string;
}

export interface CategoryList extends Category {
  items: Product[];
}

export interface BasicProduct {
  slug: string;
  name: string;
  image: ResponsiveImageType;
}

export interface Product extends BasicProduct {
  id: number;
  category: string;
  categoryImage: ResponsiveImageType;
  isNew: boolean;
  price: number;
  description: string;
  features: string;
  includes: ItemInclude[];
  gallery: GalleryImages;
  others: BasicProduct[];
}

export interface CategoryContent {
  image: string;
  category: string;
  slug: string;
}

export interface FeatureHighLightedContent {
  title: string;
  description: string;
  slug: string;
  image: ResponsiveImageType;
}

export interface FeatureLandscapeContent {
  title: string;
  slug: string;
  image: ResponsiveImageType;
}

export interface FeaturePortraitContent {
  title: string;
  slug: string;
  image: ResponsiveImageType;
}

export interface ProductCardContent {
  title: string;
  description: string;
  slug: string;
  image: ResponsiveImageType;
  isNew: boolean;
  isReversed?: boolean;
}

export interface ProductDetailedCardContent {
  title: string;
  description: string;
  price: number;
  action: string;
  image: ResponsiveImageType;
  isNew: boolean;
}

export interface SuggestionCardContent {
  image: ResponsiveImageType;
  title: string;
  action: string;
  slug: string;
}

export interface GalleryContent {
  title: string;
  images: GalleryImages;
}

export interface FeaturesSectionContent {
  title: string;
  description: string;
}

export interface InTheBoxSectionContent {
  title: string;
  items: ItemInclude[];
}

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
