import { z } from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']),
  VITE_API_BASE_URL: z.string(),
});

const envResult = envSchema.safeParse(import.meta.env);

if (!envResult.success) {
  throw new Error(
    'Failed to parse the environment variables from the ".env" file. Please checkout the ".env.example" to configure it correctly.',
  );
}

export const env = envResult.data;
