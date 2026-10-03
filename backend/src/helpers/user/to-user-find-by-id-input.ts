import { UserFindByIdInputSchema, type UserFindByIdInput } from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toUserFindByIdInput(data: unknown): UserFindByIdInput {
  return parseSchema<UserFindByIdInput>(UserFindByIdInputSchema, data);
}
