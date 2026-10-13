import type {
  ResponsiveImageType,
  GalleryImages,
  ItemInclude,
} from '@/libs/types';
import type { ApiProduct } from '@audiophile/shared';

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

export interface ProductCardContent extends Pick<
  ApiProduct,
  'name' | 'description' | 'slug' | 'image' | 'isNew'
> {
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
