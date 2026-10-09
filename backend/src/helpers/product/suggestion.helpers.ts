import type {
  Suggestion,
  SuggestionCreateInput,
  SuggestionCreateParams,
} from '@audiophile/shared';
import { SuggestionCreateInputSchema } from '@audiophile/shared';

import { parseSchema } from '@/helpers';

export function makeSuggestion({
  ...rest
}: SuggestionCreateParams): Suggestion {
  return {
    ...rest,
  };
}

export function toSuggestionCreateInput(data: unknown): SuggestionCreateInput {
  return parseSchema(SuggestionCreateInputSchema, data);
}
