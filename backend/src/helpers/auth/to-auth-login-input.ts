import { parseSchema } from '@/helpers';
import { AuthLoginInputSchema, type AuthLoginInput } from '@audiophile/shared';

export function toAuthLoginInput(data: unknown) {
  return parseSchema<AuthLoginInput>(AuthLoginInputSchema, data);
}
