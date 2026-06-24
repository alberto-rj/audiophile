import { categories, products } from '@/db/mocks';

import { uploadCategoryImages, uploadProductImages } from './upload';

async function main() {
  await uploadCategoryImages(categories);
  await uploadProductImages(products);
}

main();
