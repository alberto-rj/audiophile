import { parseSchema } from '@/helpers';
import { ApiLoginBodySchema, type ApiLoginBody } from '@/schemas';

export function makeLoginPresenter(params: unknown) {
  return parseSchema<ApiLoginBody>(ApiLoginBodySchema, params);
}
