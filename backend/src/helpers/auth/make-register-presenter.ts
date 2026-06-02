import { parseSchema } from '@/helpers';
import { ApiRegisterBodySchema, type ApiRegisterBody } from '@/schemas';

export function makeRegisterPresenter(params: unknown) {
  return parseSchema<ApiRegisterBody>(ApiRegisterBodySchema, params);
}
