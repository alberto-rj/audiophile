import path from 'node:path';

import { logger } from '../../helpers/logger/logger';
import { uploadImage } from '../../helpers/cloudinary/cloudinary';

const CATEGORY_IMAGE_FOLDER = 'audiophile/categories';
const CATEGORY_IMAGES = [
  'shared/desktop/image-category-thumbnail-headphones.png',
  'shared/desktop/image-category-thumbnail-speakers.png',
  'shared/desktop/image-category-thumbnail-earphones.png',
] as const;

const PRODUCT_IMAGE_FOLDER = 'audiophile/products';
const PRODUCT_IMAGES = [
  'product-yx1-earphones/desktop/image-product.jpg',
  'product-xx59-headphones/desktop/image-product.jpg',
  'product-xx59-headphones/desktop/image-product.jpg',
  'product-xx99-mark-two-headphones/desktop/image-product.jpg',
  'product-zx7-speaker/desktop/image-product.jpg',
  'product-zx9-speaker/desktop/image-product.jpg',
] as const;

const SHARED_IMAGE_FOLDER = 'audiophile/shared';
const SHARED_IMAGES = [
  'shared/image-best-gear.jpg',
  'shared/image-hero.jpg',
  'shared/image-earphones-yx1.jpg',
  'shared/image-speaker-zx7.jpg',
  'shared/image-speaker-zx9.png',
] as const;

async function uploadSingleImage(source: string, folder: string) {
  try {
    const filePath = path.join('public', 'assets', source);
    logger.info(`Trying to upload "${source}" into "${folder}"...`);
    await uploadImage(filePath, folder);
    logger.info(`"${source}" was uploaded successfully into "${folder}"`);
  } catch (error) {
    logger.error(`Failed to upload "${source}" into "${folder}"`, error);
  }
}

async function uploadImageList(sources: readonly string[], folder: string) {
  for (const source of sources) {
    await uploadSingleImage(source, folder);
  }
}

export async function uploadCategoryImages() {
  await uploadImageList(CATEGORY_IMAGES, CATEGORY_IMAGE_FOLDER);
}

export async function uploadProductImages() {
  await uploadImageList(PRODUCT_IMAGES, PRODUCT_IMAGE_FOLDER);
}

export async function uploadSharedImages() {
  await uploadImageList(SHARED_IMAGES, SHARED_IMAGE_FOLDER);
}
