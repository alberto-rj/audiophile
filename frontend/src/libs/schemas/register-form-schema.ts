import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string({
        error: 'Name must be string.',
      })
      .min(1, { error: 'Name is required.' }),

    email: z.email({
      pattern: z.regexes.email,
      error: 'Wrong email format.',
    }),

    password: z
      .string({ error: 'Password must be a string.' })
      .min(1, { error: 'Password is required.' }),

    confirmPassword: z
      .string({ error: 'Confirm Password must be a string.' })
      .min(1, { error: 'Confirm Password is required.' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: 'Password do not match.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
