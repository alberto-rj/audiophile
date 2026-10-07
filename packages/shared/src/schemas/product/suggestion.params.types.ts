import { z } from '@/config';

import {
  SuggestionCreateParamsSchema,
  SuggestionSourceIdParamsSchema,
  SuggestionTargetIdParamsSchema,
} from './suggestion.params.schema';

export type SuggestionSourceIdParams = z.infer<
  typeof SuggestionSourceIdParamsSchema
>;

export type SuggestionTargetIdParams = z.infer<
  typeof SuggestionTargetIdParamsSchema
>;

export type SuggestionCreateParams = z.infer<
  typeof SuggestionCreateParamsSchema
>;
