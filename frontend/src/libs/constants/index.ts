/* links (start) */
import { Facebook, Twitter, Instagram } from '@/assets/icons';

export const navLinks = [
  {
    url: createCategoryRoute('headphones'),
    text: 'Headphones',
  },
  {
    url: createCategoryRoute('speakers'),
    text: 'Speakers',
  },
  {
    url: createCategoryRoute('earphones'),
    text: 'Earphones',
  },
];

export const socialLinks = [
  { url: '#', Icon: Facebook, text: 'Facebook' },
  { url: '#', Icon: Twitter, text: 'Twitter' },
  { url: '#', Icon: Instagram, text: 'Instagram' },
];
/* links (end) */

/* Feature Highlighted (start) */
import featureHighLightedContentMobile from '@/assets/home/mobile/image-speaker-zx9.png';
import featureHighLightedContentTablet from '@/assets/home/tablet/image-speaker-zx9.png';
import featureHighLightedContentDesktop from '@/assets/home/desktop/image-speaker-zx9.png';

import type {
  FeatureHighLightedContent,
  FeaturesSectionContent,
  GalleryContent,
  InTheBoxSectionContent,
  ProductDetailedCardContent,
} from '@/libs/types';
import { createCategoryRoute, createProductRoute } from '@/libs/app-routes';

export const featureHighLightedContent: FeatureHighLightedContent = {
  title: 'Zx9 Speaker',
  description:
    'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
  slug: createProductRoute('zx9-speaker'),
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
  slug: createProductRoute('zx7-speaker'),
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
  slug: createProductRoute('yx1-earphones'),
  image: {
    mobile: featurePortraitContentMobile,
    tablet: featurePortraitContentTablet,
    desktop: featurePortraitContentDesktop,
  },
};
/* Feature Portrait (end) */

/* Product Card (start) */
import productCardContentMobile from '@/assets/product-xx99-mark-two-headphones/mobile/image-product.jpg';
import productCardContentTablet from '@/assets/product-xx99-mark-two-headphones/tablet/image-product.jpg';
import productCardContentDesktop from '@/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg';

import type { ProductCardContent } from '@/libs/types';

export const productCardContent: ProductCardContent = {
  title: 'XX99 Mark II Headphones',
  description:
    'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
  slug: '#',
  isNew: true,
  image: {
    mobile: productCardContentMobile,
    tablet: productCardContentTablet,
    desktop: productCardContentDesktop,
  },
};
/* Product Card (end) */

/* Product Detailed Card (start) */
export const productDetailedCardContent: ProductDetailedCardContent = {
  title: 'XX99 Mark II Headphones',
  description:
    'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
  price: 2.99,
  action: 'Add to cart',
  isNew: true,
  image: {
    mobile: productCardContentMobile,
    tablet: productCardContentTablet,
    desktop: productCardContentDesktop,
  },
};
/* Product Detailed Card (end) */

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

/* "Features" Section (start) */
import { newProduct } from '@/libs/mocks';
export const featuresSectionContent: FeaturesSectionContent = {
  title: 'Features',
  description: newProduct.features,
};
/* "Features" Section (end) */

/* "In The Box" Section (start) */
export const inTheBoxSectionContent: InTheBoxSectionContent = {
  title: 'In the box',
  items: newProduct.includes,
};
/* "In The Box" Section (end) */
