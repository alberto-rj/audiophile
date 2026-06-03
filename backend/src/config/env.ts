import dotenv from 'dotenv';

import { z } from '@/config';

const instructionsURL =
  'https://github.com/alberto-rj/audiophile/backend/README.md#environment-variables';

const envSchema = z.object({
  PORT: z.coerce.number().default(4224),
  SERVER_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  ACCESS_SECRET: z.string(),
  ACCESS_EXPIRES_IN_MS: z.coerce.number(),
  REFRESH_EXPIRES_IN_MS: z.coerce.number(),
  DATABASE_URL: z.string(),
  LOG_REQUEST_BODY: z.coerce.boolean().default(false),
  LOG_REQUEST_HEADERS: z.coerce.boolean().default(false),
});

dotenv.config({ path: '.env', quiet: true });

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  throw new Error(
    `Please refer to the instructions at ${instructionsURL} to configure the environment variables correctly.`,
  );
}

export const env = envResult.data;
