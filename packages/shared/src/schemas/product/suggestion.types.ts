import { z } from '@/config';

import {
  SuggestionDetailedSchema,
  SuggestionSchema,
} from './suggestion.schema';

export type Suggestion = z.infer<typeof SuggestionSchema>;

export type SuggestionDetailed = z.infer<typeof SuggestionDetailedSchema>;
