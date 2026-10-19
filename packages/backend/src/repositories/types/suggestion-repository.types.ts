import type { Suggestion, SuggestionCreateParams } from '@audiophile/shared';

export interface SuggestionRepository {
  create: (params: SuggestionCreateParams) => Promise<Suggestion>;

  createMany: (params: SuggestionCreateParams[]) => Promise<Suggestion[]>;

  clear: () => Promise<void>;
}
