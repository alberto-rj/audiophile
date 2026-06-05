import { z } from '@/config';
import { registry } from '@/openapi';

import { CreatedAtSchema } from '@/schemas/common';

export const UserIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    title: 'id',
    description: 'Unique identifier of the user.',
    example: 1,
  });

export const UserNameSchema = z
  .string({
    error: 'name must be a string.',
  })
  .trim()
  .min(1, {
    error: 'name is required.',
  })
  .max(125, {
    error: 'name cannot exceed 125 characters.',
  })
  .openapi({
    title: 'name',
    description: 'User full name.',
    example: 'John Doe',
  });

export const UserEmailSchema = z
  .string({
    error: 'email must be a string.',
  })
  .trim()
  .regex(z.regexes.email, {
    error: 'email must be a valid email address.',
  })
  .openapi({
    title: 'email',
    description: 'E-email address.',
    format: 'email',
    example: 'johndoe@example.com',
  });

export const UserCreatedAtSchema = CreatedAtSchema;

export const USER_PASSWORD_ERRORS = {
  STRING: 'password must be a string.',
  MIN: 'password must have at least 8 characters.',
  MAX: 'password cannot exceed 32 characters.',
  LOWERCASE: 'password must include at least 1 lowercase letter.',
  UPPERCASE: 'password must include at least 1 uppercase letter.',
  DIGIT: 'password must include at least 1 digit.',
} as const;

export const UserPasswordSchema = z
  .string({
    error: USER_PASSWORD_ERRORS.STRING,
  })
  .trim()
  .min(8, {
    error: USER_PASSWORD_ERRORS.MIN,
  })
  .max(32, {
    error: USER_PASSWORD_ERRORS.MAX,
  })
  .regex(/(?=.*[a-z])/, {
    error: USER_PASSWORD_ERRORS.LOWERCASE,
  })
  .regex(/(?=.*[A-Z])/, {
    error: USER_PASSWORD_ERRORS.UPPERCASE,
  })
  .regex(/(?=.*\d)/, {
    error: USER_PASSWORD_ERRORS.DIGIT,
  })
  .openapi({
    title: 'password',
    description:
      'A strong password with at least 8 characters, including uppercase, lowercase and numbers.',
    example: 'JohnDoe12',
    writeOnly: true,
  });

export const ApiUserCreateBodySchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const ApiUserSchema = registry.register(
  'User',
  z
    .object({
      id: UserIdSchema,
      name: UserNameSchema,
      email: UserEmailSchema,
      createdAt: CreatedAtSchema,
    })
    .openapi('User'),
);
