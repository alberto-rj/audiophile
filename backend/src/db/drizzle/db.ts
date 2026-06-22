import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/config';

import * as schema from './schemas/schemas';

const { DATABASE_URL } = env;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
