import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({
    pattern: z.regexes.email,
    error: 'Wrong email format.',
  }),

  password: z
    .string({ error: 'Password must be a string.' })
    .min(1, { error: 'Password is required.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
