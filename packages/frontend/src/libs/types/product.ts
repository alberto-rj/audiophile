import type { ApiProduct } from '@audiophile/shared';

import type { ResponsiveImageType } from '@/libs/types';

export interface ItemInclude {
  quantity: number;
  item: string;
}

export interface GalleryImages {
  first: ResponsiveImageType;
  second: ResponsiveImageType;
  third: ResponsiveImageType;
}

export type BasicProduct = Pick<ApiProduct, 'slug' | 'name' | 'image'>;
