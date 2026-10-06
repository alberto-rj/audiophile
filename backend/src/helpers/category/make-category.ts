import { type Category, type CategoryCreateParams } from '@audiophile/shared';

import { toSlug } from '../to-slug';
import { makeId } from '../make-id';

export function makeCategory({
  name,
  ...rest
}: CategoryCreateParams): Category {
  return {
    ...rest,
    id: makeId(),
    slug: toSlug(name),
    name,
  };
}
