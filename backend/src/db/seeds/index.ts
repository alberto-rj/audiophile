import {
  categoryRepository,
  galleryRepository,
  includeRepository,
  otherProductRepository,
  productRepository,
} from '@/config';
import {
  categories,
  galleries,
  includes,
  otherProducts,
  products,
} from '@/db/mocks';

import { seedCategories } from './category/seed-categories';
import { seedProducts } from './product/seed-product';
import { seedOtherProducts } from './product/seed-other-product';
import {
  uploadCategoryImages,
  uploadProductImages,
} from '@/scripts/upload/upload';

async function main() {
  try {
    await Promise.all([
      galleryRepository.clear(),
      includeRepository.clear(),
      otherProductRepository.clear(),
    ]);
    await productRepository.clear();
    await categoryRepository.clear();

    await uploadCategoryImages(categories);
    await uploadProductImages(products);

    const createdCategories = await seedCategories({ categories });

    const createdProducts = await seedProducts({
      categories: createdCategories,
      galleries,
      includes,
      products,
    });

    await seedOtherProducts({
      otherProducts,
      products: createdProducts,
    });

    process.exit(0);
  } catch {
    process.exit(1);
  }
}

main();
