import {
  uploadCategoryImages,
  uploadProductImages,
  uploadSharedImages,
} from './upload';

async function main() {
  await uploadCategoryImages();
  await uploadProductImages();
  await uploadSharedImages();
}

main();
