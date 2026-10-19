import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from '@audiophile/shared';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: UserNameSchema,

    email: UserEmailSchema,

    password: UserPasswordSchema,

    confirmPassword: UserPasswordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: 'Password do not match.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
