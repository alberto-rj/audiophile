import {
  SuggestionCreateParamsSchema,
  SuggestionSourceIdParamsSchema,
  SuggestionTargetIdParamsSchema,
} from './suggestion.params.schema';

export const SuggestionSourceIdInputSchema =
  SuggestionSourceIdParamsSchema.extend({});

export const SuggestionTargetIdInputSchema =
  SuggestionTargetIdParamsSchema.extend({});

export const SuggestionCreateInputSchema = SuggestionCreateParamsSchema.extend(
  {},
);
