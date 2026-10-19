import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoryBySlugUseCase } from '@/use-cases';
import { makeResBodyResult, toApiCategory } from '@/helpers';

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
