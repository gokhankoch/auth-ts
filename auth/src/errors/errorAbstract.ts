export abstract class ErrorAbstract extends Error {
    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, ErrorAbstract.prototype);
    }
    abstract statusCode: number;
    abstract serializeErrors(): { message: string; field?: string }[];
  }