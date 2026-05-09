import type { Product } from '@/libs/types';

import rawProducts from './products.mock.json' with { type: 'json' };

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
