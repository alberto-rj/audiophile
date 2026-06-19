import { seedCategories } from './category/seed-categories';

async function main() {
  try {
    await seedCategories();
    process.exit(0);
  } catch {
    process.exit(1);
  }
}

main();
