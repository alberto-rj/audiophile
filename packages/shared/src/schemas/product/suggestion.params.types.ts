import { z } from '@/config';

import {
  SuggestionCreateParamsSchema,
  SuggestionOtherIdParamsSchema,
  SuggestionProductIdParamsSchema,
} from './suggestion.params.schema';

export type SuggestionOtherIdParams = z.infer<
  typeof SuggestionOtherIdParamsSchema
>;

export type SuggestionProductIdParams = z.infer<
  typeof SuggestionProductIdParamsSchema
>;

export type SuggestionCreateParams = z.infer<
  typeof SuggestionCreateParamsSchema
>;
