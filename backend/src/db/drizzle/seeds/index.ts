import { logger } from '@/helpers';

async function main() {
  logger.info('Populating database...');

  new Promise((resolve) => setTimeout(resolve, 500));

  logger.info('Database successfully populated');
}

main();
