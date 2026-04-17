/* Categories (start) */
import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';

export const headphonesContent: CategoryContent = {
  category: 'Headphones',
  image: headphones,
  slug: '#',
};

export const speakersContent: CategoryContent = {
  category: 'Speakers',
  image: speakers,
  slug: '#',
};

export const earphonesContent: CategoryContent = {
  category: 'Earphones',
  image: earphones,
  slug: '#',
};

export const categoriesContent: CategoryContent[] = [
  headphonesContent,
  speakersContent,
  earphonesContent,
];
/* Categories (end) */

/* Feature Highlighted (start) */
import featureHighLightedContentMobile from '@/assets/home/mobile/image-speaker-zx9.png';
import featureHighLightedContentTablet from '@/assets/home/tablet/image-speaker-zx9.png';
import featureHighLightedContentDesktop from '@/assets/home/desktop/image-speaker-zx9.png';

import type {
  CategoryContent,
  FeatureHighLightedContent,
  GalleryContent,
} from '@/libs/types';

export const featureHighLightedContent: FeatureHighLightedContent = {
  title: 'Zx9 Speaker',
  description:
    'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
  slug: '#',
  action: 'See product',
  image: {
    mobile: featureHighLightedContentMobile,
    tablet: featureHighLightedContentTablet,
    desktop: featureHighLightedContentDesktop,
  },
};
/* Feature Highlighted (end) */

/* Feature Landscape (start) */
import featureLandscapeContentMobile from '@/assets/home/mobile/image-speaker-zx7.jpg';
import featureLandscapeContentTablet from '@/assets/home/tablet/image-speaker-zx7.jpg';
import featureLandscapeContentDesktop from '@/assets/home/desktop/image-speaker-zx7.jpg';

import type { FeatureLandscapeContent } from '@/libs/types';

export const featureLandscapeContent: FeatureLandscapeContent = {
  title: 'Zx7 Speaker',
  slug: '#',
  action: 'See product',
  image: {
    mobile: featureLandscapeContentMobile,
    tablet: featureLandscapeContentTablet,
    desktop: featureLandscapeContentDesktop,
  },
};
/* Feature Landscape (end) */

/* Feature Portrait (start) */
import featurePortraitContentMobile from '@/assets/home/mobile/image-earphones-yx1.jpg';
import featurePortraitContentTablet from '@/assets/home/tablet/image-earphones-yx1.jpg';
import featurePortraitContentDesktop from '@/assets/home/desktop/image-earphones-yx1.jpg';

import type { FeaturePortraitContent } from '@/libs/types';

export const featurePortraitContent: FeaturePortraitContent = {
  title: 'Yx1 Earphones',
  slug: '#',
  action: 'See product',
  image: {
    mobile: featurePortraitContentMobile,
    tablet: featurePortraitContentTablet,
    desktop: featurePortraitContentDesktop,
  },
};
/* Feature Portrait (end) */

/* Feature Portrait (start) */
import productCardContentMobile from '@/assets/product-xx99-mark-two-headphones/mobile/image-product.jpg';
import productCardContentTablet from '@/assets/product-xx99-mark-two-headphones/tablet/image-product.jpg';
import productCardContentDesktop from '@/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg';

import type { ProductCardContent } from '@/libs/types';

export const productCardContent: ProductCardContent = {
  title: 'XX99 Mark II Headphones',
  description:
    'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
  slug: '#',
  action: 'See product',
  isNew: true,
  image: {
    mobile: productCardContentMobile,
    tablet: productCardContentTablet,
    desktop: productCardContentDesktop,
  },
};
/* Feature Portrait (end) */

/* Gallery (start) */
import galleryItem1Mobile from '@/assets/product-xx59-headphones/mobile/image-gallery-1.jpg';
import galleryItem1Tablet from '@/assets/product-xx59-headphones/tablet/image-gallery-1.jpg';
import galleryItem1Desktop from '@/assets/product-xx59-headphones/desktop/image-gallery-1.jpg';

import galleryItem2Mobile from '@/assets/product-xx59-headphones/mobile/image-gallery-2.jpg';
import galleryItem2Tablet from '@/assets/product-xx59-headphones/tablet/image-gallery-2.jpg';
import galleryItem2Desktop from '@/assets/product-xx59-headphones/desktop/image-gallery-2.jpg';

import galleryItem3Mobile from '@/assets/product-xx59-headphones/mobile/image-gallery-3.jpg';
import galleryItem3Tablet from '@/assets/product-xx59-headphones/tablet/image-gallery-3.jpg';
import galleryItem3Desktop from '@/assets/product-xx59-headphones/desktop/image-gallery-3.jpg';

export const galleryContent: GalleryContent = {
  title: 'XX59 Headphones',
  images: {
    first: {
      mobile: galleryItem1Mobile,
      tablet: galleryItem1Tablet,
      desktop: galleryItem1Desktop,
    },
    second: {
      mobile: galleryItem2Mobile,
      tablet: galleryItem2Tablet,
      desktop: galleryItem2Desktop,
    },
    third: {
      mobile: galleryItem3Mobile,
      tablet: galleryItem3Tablet,
      desktop: galleryItem3Desktop,
    },
  },
};
/* Gallery (end) */

/* Suggestion Card (start) */
import suggestionXX99Mobile from '@/assets/product-xx99-mark-one-headphones/mobile/image-product.jpg';
import suggestionXX99Tablet from '@/assets/product-xx99-mark-one-headphones/tablet/image-product.jpg';
import suggestionXX99Desktop from '@/assets/product-xx99-mark-one-headphones/desktop/image-product.jpg';

import type { SuggestionCardContent } from '@/libs/types';

export const suggestionXX99: SuggestionCardContent = {
  title: 'XX99 MARK I',
  slug: '#',
  action: 'See product',
  image: {
    mobile: suggestionXX99Mobile,
    tablet: suggestionXX99Tablet,
    desktop: suggestionXX99Desktop,
  },
};

import suggestionXX59Mobile from '@/assets/product-xx59-headphones/mobile/image-product.jpg';
import suggestionXX59Tablet from '@/assets/product-xx59-headphones/tablet/image-product.jpg';
import suggestionXX59Desktop from '@/assets/product-xx59-headphones/desktop/image-product.jpg';

export const suggestionXX59: SuggestionCardContent = {
  title: 'XX59',
  slug: '#',
  action: 'See product',
  image: {
    mobile: suggestionXX59Mobile,
    tablet: suggestionXX59Tablet,
    desktop: suggestionXX59Desktop,
  },
};

import suggestionZX9Mobile from '@/assets/product-zx9-speaker/mobile/image-product.jpg';
import suggestionZX9Tablet from '@/assets/product-zx9-speaker/tablet/image-product.jpg';
import suggestionZX9Desktop from '@/assets/product-zx9-speaker/desktop/image-product.jpg';

export const suggestionZX9: SuggestionCardContent = {
  title: 'ZX9 SPEAKER',
  slug: '#',
  action: 'See product',
  image: {
    mobile: suggestionZX9Mobile,
    tablet: suggestionZX9Tablet,
    desktop: suggestionZX9Desktop,
  },
};

export const suggestionItems: SuggestionCardContent[] = [
  suggestionXX99,
  suggestionXX59,
  suggestionZX9,
];
/* Suggestion Card (end) */
