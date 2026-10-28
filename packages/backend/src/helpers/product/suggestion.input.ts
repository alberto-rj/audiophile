import type { SuggestionCreateInput } from '@audiophile/shared';
import { SuggestionCreateInputSchema } from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toSuggestionCreateInput(data: unknown): SuggestionCreateInput {
  return parseSchema(SuggestionCreateInputSchema, data);
}
