import {
  SuggestionCreateParamsSchema,
  SuggestionOtherIdParamsSchema,
  SuggestionProductIdParamsSchema,
} from './suggestion.params.schema';

export const SuggestionOtherIdInputSchema =
  SuggestionOtherIdParamsSchema.extend({});

export const SuggestionProductIdInputSchema =
  SuggestionProductIdParamsSchema.extend({});

export const SuggestionCreateInputSchema = SuggestionCreateParamsSchema.extend(
  {},
);
