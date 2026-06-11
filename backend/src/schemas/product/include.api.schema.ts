import { IncludeSchema } from './include.schema';

export const ApiIncludeSchema = IncludeSchema.omit({
  id: true,
  productId: true,
});
