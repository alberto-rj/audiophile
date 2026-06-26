import path from 'node:path';

import { logger } from '../../helpers/logger/logger';
import { toPublicId, uploadImage } from '../../helpers/cloudinary/cloudinary';

const CATEGORY_IMAGE_FOLDER = 'audiophile/categories';
const CATEGORY_IMAGES = [
  'shared/image-category-thumbnail-headphones.png',
  'shared/image-category-thumbnail-speakers.png',
  'shared/image-category-thumbnail-earphones.png',
] as const;

const PRODUCT_IMAGE_FOLDER = 'audiophile/products';
const PRODUCT_IMAGES = [
  'product-xx59-headphones/image-product.jpg',
  'product-xx99-mark-one-headphones/image-product.jpg',
  'product-xx99-mark-two-headphones/image-product.jpg',
  'product-yx1-earphones/image-product.jpg',
  'product-zx7-speaker/image-product.jpg',
  'product-zx9-speaker/image-product.jpg',
] as const;

const GALLERY_IMAGE_FOLDER = 'audiophile/galleries';
const GALLERY_IMAGES = [
  {
    first: 'product-xx59-headphones/image-gallery-1.jpg',
    second: 'product-xx59-headphones/image-gallery-2.jpg',
    third: 'product-xx59-headphones/image-gallery-3.jpg',
  },
  {
    first: 'product-xx99-mark-one-headphones/image-gallery-1.jpg',
    second: 'product-xx99-mark-one-headphones/image-gallery-2.jpg',
    third: 'product-xx99-mark-one-headphones/image-gallery-3.jpg',
  },
  {
    first: 'product-xx99-mark-two-headphones/image-gallery-1.jpg',
    second: 'product-xx99-mark-two-headphones/image-gallery-2.jpg',
    third: 'product-xx99-mark-two-headphones/image-gallery-3.jpg',
  },
  {
    first: 'product-yx1-earphones/image-gallery-1.jpg',
    second: 'product-yx1-earphones/image-gallery-2.jpg',
    third: 'product-yx1-earphones/image-gallery-3.jpg',
  },
  {
    first: 'product-zx7-speaker/image-gallery-1.jpg',
    second: 'product-zx7-speaker/image-gallery-2.jpg',
    third: 'product-zx7-speaker/image-gallery-3.jpg',
  },
  {
    first: 'product-zx9-speaker/image-gallery-1.jpg',
    second: 'product-zx9-speaker/image-gallery-2.jpg',
    third: 'product-zx9-speaker/image-gallery-3.jpg',
  },
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
    const publicId = toPublicId(source);
    logger.info(`Uploading "${source}"...`);
    await uploadImage(filePath, folder, publicId);
    logger.info(`Done: "${source}"`);
  } catch (error) {
    logger.error(`Failed to upload "${source}"`, error);
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

export async function uploadGalleryImages() {
  for (const { first, second, third } of GALLERY_IMAGES) {
    await uploadImageList([first, second, third], GALLERY_IMAGE_FOLDER);
  }
}

export async function uploadSharedImages() {
  await uploadImageList(SHARED_IMAGES, SHARED_IMAGE_FOLDER);
}
