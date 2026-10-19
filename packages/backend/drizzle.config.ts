import { defineConfig } from 'drizzle-kit';

import { env } from './src/config';

const { DATABASE_URL } = env;

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: './src/db/drizzle/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
