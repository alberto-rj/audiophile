import {
  UserUpdateProfileInputSchema,
  type UserUpdateProfileInput,
} from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toUserUpdateProfileInput(
  data: unknown,
): UserUpdateProfileInput {
  return parseSchema<UserUpdateProfileInput>(
    UserUpdateProfileInputSchema,
    data,
  );
}
