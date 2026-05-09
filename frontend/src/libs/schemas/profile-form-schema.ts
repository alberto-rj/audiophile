import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z
    .string({
      error: 'Name must be string.',
    })
    .min(1, { error: 'Name is required.' }),

  email: z.email({
    pattern: z.regexes.email,
    error: 'Wrong email format.',
  }),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
