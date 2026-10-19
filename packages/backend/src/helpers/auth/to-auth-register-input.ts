import {
  AuthRegisterInputSchema,
  type AuthRegisterInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toAuthRegisterInput(data: unknown) {
  return parseSchema<AuthRegisterInput>(AuthRegisterInputSchema, data);
}
