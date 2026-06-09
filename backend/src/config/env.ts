import dotenv from 'dotenv';

import { z } from '@/config';

const instructionsURL =
  'https://github.com/alberto-rj/audiophile/backend/README.md#environment-variables';

const envSchema = z.object({
  PORT: z.coerce.number().default(4224),
  DEV_API_BASE_URL: z.string(),
  PROD_API_BASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  ACCESS_SECRET: z.string(),
  ACCESS_EXPIRES_MS: z.coerce.number(),
  REFRESH_EXPIRES_MS: z.coerce.number(),
  DATABASE_URL: z.string(),
  LOG_REQUEST_BODY: z.coerce.boolean().default(false),
  LOG_REQUEST_HEADERS: z.coerce.boolean().default(false),
  CORS_ORIGINS: z.string().transform((arg) => arg.split(';')),
  CORS_METHODS: z.string().transform((arg) => arg.split(';')),
  CORS_HEADERS: z.string().transform((arg) => arg.split(';')),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

dotenv.config({ path: '.env', quiet: true });

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  throw new Error(
    `Please refer to the instructions at ${instructionsURL} to configure the environment variables correctly.`,
  );
}

export const env = envResult.data;
