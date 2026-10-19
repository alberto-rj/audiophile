import { StatusCodes } from 'http-status-codes';

import { AppError } from '../app-error';
import { makeResBodyError, type ResBodyError } from '../make-res-body';

export class InvalidCartError extends AppError<ResBodyError> {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }

  format() {
    return makeResBodyError(this.message);
  }
}
