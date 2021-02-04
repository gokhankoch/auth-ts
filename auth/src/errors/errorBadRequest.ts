import { ErrorAbstract } from './errorAbstract'

 class ErrorBadRequest extends ErrorAbstract{
    constructor (public message: string ){
        super(message);

        // only because we are extending a built class
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
    }

    statusCode = 400;

    serializeErrors(){
        return [{ message: this.message}];
    }
       
}

export { ErrorBadRequest };