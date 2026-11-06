import {
  UserFindByIdInputSchema,
  UserUpdateProfileInputSchema,
  type UserFindByIdInput,
  type UserUpdateProfileInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toUserUpdateProfileInput(
  data: unknown,
): UserUpdateProfileInput {
  return parseSchema<UserUpdateProfileInput>(
    UserUpdateProfileInputSchema,
    data,
  );
}

export function toUserFindByIdInput(data: unknown): UserFindByIdInput {
  return parseSchema<UserFindByIdInput>(UserFindByIdInputSchema, data);
}
