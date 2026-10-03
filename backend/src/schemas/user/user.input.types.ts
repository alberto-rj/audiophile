import type { z } from '@/config';

import type {
  UserCreateInputSchema,
  UserFindByIdInputSchema,
  UserUpdateProfileInputSchema,
} from './user.input.schema';

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

export type UserUpdateProfileInput = z.infer<
  typeof UserUpdateProfileInputSchema
>;

export type UserFindByIdInput = z.infer<typeof UserFindByIdInputSchema>;
