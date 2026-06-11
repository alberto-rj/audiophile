import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';

export const ApiGallerySchema = z.object({
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});
