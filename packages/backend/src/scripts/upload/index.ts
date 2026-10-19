import {
  uploadCategoryImages,
  uploadGalleryImages,
  uploadProductImages,
  uploadSharedImages,
} from './upload';

async function main() {
  await uploadCategoryImages();
  await uploadProductImages();
  await uploadGalleryImages();
  await uploadSharedImages();
}

main();
