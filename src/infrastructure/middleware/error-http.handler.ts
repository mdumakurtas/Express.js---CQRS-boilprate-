import { NextFunction, Request, Response } from 'express';
import { logError } from '../../application/utils';
import { ValidationError } from '../../application/errors';

const isDebug = process.env.NODE_ENV === 'development';

const createHttpErrorResponseBody = (
  res: Response,
  code: number,
  message: string,
  errors?: unknown,
) => {
  res.status(code).json({ message, errors });
};

export const errorHttpHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    const requestApiDetails = {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      errors: JSON.stringify(err.errors, null),
      stack: err.stack,
    };

    if (isDebug) {
      // log to console with clickable stack trace
      logError('', requestApiDetails);
    } else {
      // log to console json format
      logError(JSON.stringify(requestApiDetails));
    }

    return createHttpErrorResponseBody(
      res,
      400,
      'Validation Error',
      err.errors,
    );
  }

  logError('Internal Server Error', err);
  createHttpErrorResponseBody(res, 500, 'Internal Server Error');
};
