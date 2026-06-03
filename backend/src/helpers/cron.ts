import cron from 'node-cron';

import { refreshTokenRepository } from '@/config';

const SCHEDULE_EXPRESSION = '0 3 * * *';

async function cleanExpiredRefreshTokens() {
  await refreshTokenRepository.deleteManyExpired();
}

cron.schedule(SCHEDULE_EXPRESSION, cleanExpiredRefreshTokens);
