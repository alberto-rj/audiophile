import { z } from '@/config';

import {
  SuggestionCreateInputSchema,
  SuggestionOtherIdInputSchema,
  SuggestionProductIdInputSchema,
} from './suggestion.input.schema';

export type SuggestionOtherIdInput = z.infer<
  typeof SuggestionOtherIdInputSchema
>;

export type SuggestionProductIdInput = z.infer<
  typeof SuggestionProductIdInputSchema
>;

export type SuggestionCreateInput = z.infer<typeof SuggestionCreateInputSchema>;
