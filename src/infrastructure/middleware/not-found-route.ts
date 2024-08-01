import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../../application/errors';

export const notFoundRoute = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  throw new NotFoundError('route');
};
