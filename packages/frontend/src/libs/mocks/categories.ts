import type { ApiCategory } from '@audiophile/shared';

export const categories: ApiCategory[] = [
  {
    id: 1,
    slug: 'headphones',
    image: {
      desktop: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
      mobile: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
      tablet: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
    },
    name: 'Headphones',
    description: 'Headphones description',
  },
  {
    id: 2,
    slug: 'speakers',
    image: {
      desktop: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
      mobile: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
      tablet: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
    },
    name: 'Speakers',
    description: 'Speakers description',
  },
  {
    id: 3,
    slug: 'earphones',
    image: {
      desktop: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
      mobile: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
      tablet: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
    },
    name: 'Earphones',
    description: 'Earphones description',
  },
];
