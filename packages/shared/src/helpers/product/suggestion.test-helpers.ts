import type { Suggestion, SuggestionCreateParams } from '@/schemas';

export function makeSuggestion({
  ...rest
}: SuggestionCreateParams): Suggestion {
  return {
    ...rest,
  };
}
