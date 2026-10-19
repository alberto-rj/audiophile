import {
  UserFindByIdInputSchema,
  type UserFindByIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toUserFindByIdInput(data: unknown): UserFindByIdInput {
  return parseSchema<UserFindByIdInput>(UserFindByIdInputSchema, data);
}
