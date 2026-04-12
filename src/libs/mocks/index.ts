import rawProducts from './products.mock.json' with { type: 'json' };

import type { Product } from '@/libs/types';

import mobile from '@/assets/home/mobile/image-header.jpg';
import tablet from '@/assets/home/tablet/image-header.jpg';
import desktop from '@/assets/home/desktop/image-hero.jpg';

export const products = rawProducts as Product[];

export const newProduct = products.find((product) => product.isNew)!;
export const oldProduct = products.find((product) => !product.isNew)!;

newProduct.image = {
  mobile,
  tablet,
  desktop,
};

oldProduct.image = {
  mobile,
  tablet,
  desktop,
};
