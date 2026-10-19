import { z } from 'zod';

const instructionsURL =
  'https://github.com/alberto-rj/audiophile/blob/main/README.md#frontend-frontendenv';

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']),
  VITE_API_BASE_URL: z.string(),
});

const envResult = envSchema.safeParse(import.meta.env);

if (!envResult.success) {
  throw new Error(
    `Please refer to the instructions at ${instructionsURL} to configure the environment variables correctly.`,
  );
}

export const env = envResult.data;
