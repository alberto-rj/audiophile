import { z } from '@/config';

import {
  ApiSuggestionCreateBodySchema,
  ApiSuggestionOtherIdParamsSchema,
  ApiSuggestionProductIdParamsSchema,
  ApiSuggestionSchema,
} from './suggestion.api.schema';

export type ApiSuggestionOtherIdParams = z.infer<
  typeof ApiSuggestionOtherIdParamsSchema
>;

export type ApiSuggestionProductIdParams = z.infer<
  typeof ApiSuggestionProductIdParamsSchema
>;

export type ApiSuggestionCreateBody = z.infer<
  typeof ApiSuggestionCreateBodySchema
>;

export type ApiSuggestion = z.infer<typeof ApiSuggestionSchema>;
