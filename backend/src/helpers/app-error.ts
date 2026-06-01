import { StatusCodes } from 'http-status-codes';

import {
  makeResBodyError,
  makeResBodyValidationError,
  type ResBodyError,
  type ResBodyValidationError,
} from '@/helpers';

export abstract class AppError<T> extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  abstract format(): T;
}

export class UnauthorizedError extends AppError<ResBodyError> {
  constructor(message: string = 'Unauthorized error.') {
    super(message, StatusCodes.UNAUTHORIZED);
  }

  format() {
    return makeResBodyError(this.message);
  }
}

export class BadRequestError extends AppError<ResBodyError> {
  constructor(message: string = 'Bad request error.') {
    super(message, StatusCodes.BAD_REQUEST);
  }

  format() {
    return makeResBodyError(this.message);
  }
}

export class ConflictError extends AppError<ResBodyError> {
  constructor(message: string = 'Conflict error.') {
    super(message, StatusCodes.CONFLICT);
  }

  format() {
    return makeResBodyError(this.message);
  }
}

export class ResourceNotFoundError extends AppError<ResBodyError> {
  constructor(message: string = 'Resource not found.') {
    super(message, StatusCodes.NOT_FOUND);
  }

  format() {
    return makeResBodyError(this.message);
  }
}

export class ValidationError<T> extends AppError<ResBodyValidationError<T>> {
  protected details: T;

  constructor(details: T, message: string = 'Validation error.') {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
    this.details = details;
  }

  format() {
    return makeResBodyValidationError(this.details);
  }
}
