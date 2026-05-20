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

export interface ProductResponse {
  product: Product;
}

export interface ProductListResponse {
  products: Product[];
}
