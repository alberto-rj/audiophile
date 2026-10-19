import {
  UserUpdateProfileInputSchema,
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
