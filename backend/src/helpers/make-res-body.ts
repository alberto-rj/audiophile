export type ResBodyError = {
  error: {
    message: string;
  };
};

export type ResBodyValidationError<T> = {
  error: T;
};

export type ResBodyResult<T> = {
  results: T[];
};

export type ResBodyResultList<T> = {
  results: T;
};

export function makeResBodyError(message: string): ResBodyError {
  return {
    error: {
      message,
    },
  };
}

export function makeResBodyValidationError<T>(
  details: T,
): ResBodyValidationError<T> {
  return {
    error: {
      ...details,
    },
  };
}

export function makeResBodyResult<T>(resource: T): ResBodyResult<T> {
  return {
    results: [resource],
  };
}

export function makeResBodyResultList<T>(resources: T): ResBodyResultList<T> {
  return {
    results: resources,
  };
}
