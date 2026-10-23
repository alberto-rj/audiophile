import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiCategory } from '@/helpers/category';
import { makeResBodyResult } from '@/helpers/make-res-body';
import { findCategoryBySlugUseCase } from '@/use-cases/category';

export async function getCategoryBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { slug } = req.params;

    const { output: category } = await findCategoryBySlugUseCase({
      input: {
        slug,
      },
    });

    const apiCategory = toApiCategory(category);
    res.status(StatusCodes.OK).json(makeResBodyResult(apiCategory));
  } catch (error) {
    next(error);
  }
}
