import type { Categories, Products } from '@/db/mocks';
import { logger, uploadImage } from '@/helpers';
import path from 'node:path';

const CATEGORY_IMAGE_FOLDER = 'audiophile/categories';
const PRODUCT_IMAGE_FOLDER = 'audiophile/products';

async function uploadSingleImage(source: string, folder: string) {
  try {
    const filePath = path.join('public', source);
    logger.info(`Trying to upload "${source}" into "${folder}"...`);
    await uploadImage(filePath, folder);
    logger.info(`"${source}" was uploaded successfully into "${folder}"`);
  } catch (error) {
    logger.error(`Failed to upload "${source}" into "${folder}"`, error);
  }
}

export async function uploadCategoryImages(categories: Categories) {
  for (const { image } of categories) {
    await uploadSingleImage(image, CATEGORY_IMAGE_FOLDER);
  }
}

export async function uploadProductImages(products: Products) {
  for (const { image } of products) {
    await uploadSingleImage(image, PRODUCT_IMAGE_FOLDER);
  }
}
