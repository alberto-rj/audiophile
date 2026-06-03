import cron from 'node-cron';

import { refreshTokenRepository } from '@/config';
import { logger } from '@/helpers';

const SCHEDULE_EXPRESSION = '0 3 * * *';

async function cleanExpiredRefreshTokens() {
  try {
    logger.info('Trying to delete expired token(s)...');
    await refreshTokenRepository.deleteManyExpired();
    logger.info('Successfully deleted expired token(s)');
  } catch (error) {
    logger.error('Failed to deleted expired token(s)', error);
  }
}

export function scheduleTasks() {
  cron.schedule(SCHEDULE_EXPRESSION, cleanExpiredRefreshTokens);
}
