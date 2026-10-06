import { parseSchema } from '@/helpers';
import {
  AuthRegisterInputSchema,
  type AuthRegisterInput,
} from '@audiophile/shared';

export function toAuthRegisterInput(data: unknown) {
  return parseSchema<AuthRegisterInput>(AuthRegisterInputSchema, data);
}
