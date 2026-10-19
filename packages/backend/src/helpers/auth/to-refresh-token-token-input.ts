import {
  RefreshTokenTokenInputSchema,
  type RefreshTokenTokenInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toRefreshTokenTokenInput(
  data: unknown,
): RefreshTokenTokenInput {
  return parseSchema(RefreshTokenTokenInputSchema, data);
}
