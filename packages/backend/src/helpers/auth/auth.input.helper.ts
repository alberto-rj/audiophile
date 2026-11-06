import {
  AuthLoginInputSchema,
  AuthRegisterInputSchema,
  RefreshTokenTokenInputSchema,
  type AuthLoginInput,
  type AuthRegisterInput,
  type RefreshTokenTokenInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toAuthLoginInput(data: unknown) {
  return parseSchema<AuthLoginInput>(AuthLoginInputSchema, data);
}

export function toAuthRegisterInput(data: unknown) {
  return parseSchema<AuthRegisterInput>(AuthRegisterInputSchema, data);
}

export function toRefreshTokenTokenInput(
  data: unknown,
): RefreshTokenTokenInput {
  return parseSchema(RefreshTokenTokenInputSchema, data);
}
