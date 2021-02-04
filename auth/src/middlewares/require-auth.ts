import { Request, Response, NextFunction } from 'express';
import { ErrorNotAuthorized } from '../errors/errorNotAuthrized';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new ErrorNotAuthorized();
  }

  next();
};
