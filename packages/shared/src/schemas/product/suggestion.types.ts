import { z } from '@/config';

import type { SuggestionSchema } from './suggestion.schema';

export type Suggestion = z.infer<typeof SuggestionSchema>;
