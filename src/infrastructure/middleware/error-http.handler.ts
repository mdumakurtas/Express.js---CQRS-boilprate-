import { NextFunction, Request, Response } from 'express';
import { logError } from '../../application/utils';
import { NotFoundError, ValidationError } from '../../application/errors';

const isDebug = process.env.NODE_ENV === 'development';

const createHttpErrorResponseBody = (
  res: Response,
  code: number,
  message: string,
  errors?: unknown,
) => {
  res.status(code).json({ message, errors });
};

const getRequestApiDetails = (
  req: Request,
  errors: string,
  stack?: string,
) => ({
  method: req.method,
  url: req.originalUrl,
  body: req.body,
  errors,
  stack,
});

const logForConsole = (
  requestApiDetails: {
    stack?: string;
    method: string;
    body: any;
    url: string;
    errors: string;
  },
  message = '',
) => {
  if (isDebug) {
    // log to console with clickable stack trace
    logError(message, requestApiDetails);
  } else {
    // log to console json format
    logError(JSON.stringify(requestApiDetails));
  }
};
export const errorHttpHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    const requestApiDetails = getRequestApiDetails(
      req,
      JSON.stringify(err.errors),
      err.stack,
    );

    logForConsole(requestApiDetails);
    return createHttpErrorResponseBody(res, 400, 'Bad Request', err.errors);
  }

  if (err instanceof NotFoundError) {
    const requestApiDetails = getRequestApiDetails(
      req,
      err.getMessage(),
      err.stack,
    );

    logForConsole(requestApiDetails);
    return createHttpErrorResponseBody(res, 404, err.getMessage());
  }

  const requestApiDetails = getRequestApiDetails(
    req,
    JSON.stringify(err),
    err.stack,
  );
  logForConsole(requestApiDetails, 'Internal Server Error');
  return createHttpErrorResponseBody(res, 500, 'Internal Server Error');
};
