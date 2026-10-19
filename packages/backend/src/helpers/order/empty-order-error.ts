import { StatusCodes } from 'http-status-codes';

import { AppError } from '../app-error';
import { makeResBodyError, type ResBodyError } from '../make-res-body';

export class EmptyOrderError extends AppError<ResBodyError> {
  constructor(message: string) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }

  format() {
    return makeResBodyError(this.message);
  }
}
