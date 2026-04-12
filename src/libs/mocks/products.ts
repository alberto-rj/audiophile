import rawProducts from './products.mock.json' with { type: 'json' };

import type { Product } from '@/libs/types';

import mobile from '@/assets/home/mobile/image-header.jpg';
import tablet from '@/assets/home/tablet/image-header.jpg';
import desktop from '@/assets/home/desktop/image-hero.jpg';

export const products = rawProducts as Product[];

export const newProduct = products.find((product) => product.isNew)!;
export const oldProduct = products.find((product) => !product.isNew)!;

const getProductWithCode = (name: string) => {
  return products.find((product) =>
    product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
  )!;
};

export const speakerZX7 = getProductWithCode('zx7');
export const speakerZX9 = getProductWithCode('zx9');
export const earphonesYX1 = getProductWithCode('yx1');

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
