import { parseSchema } from '@/helpers';

import type {
  OtherProduct,
  OtherProductCreateParams,
} from '@audiophile/shared';
import { OtherProductCreateParamsSchema } from '@audiophile/shared';

export function makeOtherProduct({
  ...rest
}: OtherProductCreateParams): OtherProduct {
  return {
    ...rest,
  };
}

export function makeOtherProductCreateParams(
  params: unknown,
): OtherProductCreateParams {
  return parseSchema(OtherProductCreateParamsSchema, params);
}
