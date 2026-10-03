import { parseSchema } from '@/helpers';
import { AuthLoginInputSchema, type AuthLoginInput } from '@/schemas';

export function toAuthLoginInput(data: unknown) {
  return parseSchema<AuthLoginInput>(AuthLoginInputSchema, data);
}
