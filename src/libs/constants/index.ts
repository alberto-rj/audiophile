/* Categories (start) */
import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';

export const categoriesContent: CategoryContent[] = [
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
];
/* Categories (end) */

/* Feature Highlighted (start) */
import featureHighLightedContentMobile from '@/assets/home/mobile/image-speaker-zx9.png';
import featureHighLightedContentTablet from '@/assets/home/tablet/image-speaker-zx9.png';
import featureHighLightedContentDesktop from '@/assets/home/desktop/image-speaker-zx9.png';

import type { CategoryContent, FeatureHighLightedContent } from '@/libs/types';

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
