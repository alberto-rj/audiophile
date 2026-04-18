export interface ResponsiveImageType {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInclude {
  quantity: number;
  item: string;
}

export interface GalleryImages {
  first: ResponsiveImageType;
  second: ResponsiveImageType;
  third: ResponsiveImageType;
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
  includes: ProductInclude[];
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
  action: string;
  image: ResponsiveImageType;
}

export interface FeatureLandscapeContent {
  title: string;
  slug: string;
  action: string;
  image: ResponsiveImageType;
}

export interface FeaturePortraitContent {
  title: string;
  slug: string;
  action: string;
  image: ResponsiveImageType;
}

export interface ProductCardContent {
  title: string;
  description: string;
  slug: string;
  action: string;
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
