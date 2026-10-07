import { z } from '@/config';

import {
  SuggestionCreateInputSchema,
  SuggestionSourceIdInputSchema,
  SuggestionTargetIdInputSchema,
} from './suggestion.input.schema';

export type SuggestionSourceIdInput = z.infer<
  typeof SuggestionSourceIdInputSchema
>;

export type SuggestionTargetIdInput = z.infer<
  typeof SuggestionTargetIdInputSchema
>;

export type SuggestionCreateInput = z.infer<typeof SuggestionCreateInputSchema>;
