import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorRequestValidation} from '../errors/errorRequestValidation';

 const requestValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ErrorRequestValidation(errors.array());
  }

  next();
};

export { requestValidate };
