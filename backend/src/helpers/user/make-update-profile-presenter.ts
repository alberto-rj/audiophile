import { parseSchema } from '@/helpers';
import {
  ApiUpdateProfileBodySchema,
  type ApiUpdateProfileBody,
} from '@/schemas';

export function makeUpdateProfilePresenter(params: unknown) {
  return parseSchema<ApiUpdateProfileBody>(ApiUpdateProfileBodySchema, params);
}
