import { parseSchema } from '@/helpers';

import type {
  OtherProduct,
  OtherProductCreateParams,
} from './other-product.types';
import { OtherProductCreateParamsSchema } from './other-product.schema';

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
