import { AuthLoginInputSchema, type AuthLoginInput } from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toAuthLoginInput(data: unknown) {
  return parseSchema<AuthLoginInput>(AuthLoginInputSchema, data);
}
