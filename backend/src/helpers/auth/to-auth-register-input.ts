import { parseSchema } from '@/helpers';
import { AuthRegisterInputSchema, type AuthRegisterInput } from '@/schemas';

export function toAuthRegisterInput(data: unknown) {
  return parseSchema<AuthRegisterInput>(AuthRegisterInputSchema, data);
}
