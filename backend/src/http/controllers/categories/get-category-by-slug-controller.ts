import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoryBySlugUseCase } from '@/use-cases';
import { makeResBodyResult, toApiCategory, toApiProduct } from '@/helpers';

export async function getCategoryBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { slug } = req.params;

    const { category, productPaginationResult } =
      await findCategoryBySlugUseCase({
        input: { slug },
      });

    const apiCategory = toApiCategory(category);
    const apiProducts = productPaginationResult.items.map(toApiProduct);
    const apiProductPaginationResult = {
      ...productPaginationResult,
      items: apiProducts,
    };
    const apiResult = {
      ...apiCategory,
      ...apiProductPaginationResult,
    };

    res.status(StatusCodes.OK).json(makeResBodyResult(apiResult));
  } catch (error) {
    next(error);
  }
}
