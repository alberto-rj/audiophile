import { z } from '@/config';

import {
  ApiSuggestionCreateBodySchema,
  ApiSuggestionSourceIdParamsSchema,
  ApiSuggestionTargetIdParamsSchema,
  ApiSuggestionSchema,
} from './suggestion.api.schema';

export type ApiSuggestionSourceIdParams = z.infer<
  typeof ApiSuggestionSourceIdParamsSchema
>;

export type ApiSuggestionTargetIdParams = z.infer<
  typeof ApiSuggestionTargetIdParamsSchema
>;

export type ApiSuggestionCreateBody = z.infer<
  typeof ApiSuggestionCreateBodySchema
>;

export type ApiSuggestion = z.infer<typeof ApiSuggestionSchema>;
