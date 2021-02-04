import { CustomError } from './custom-error';

export class ErrorNotAuthorized extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, ErrorNotAuthorized.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}