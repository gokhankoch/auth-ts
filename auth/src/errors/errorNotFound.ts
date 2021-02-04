import { ErrorAbstract } from './errorAbstract'

 class ErrorNotFound extends ErrorAbstract{

     statusCode = 404;

    constructor (){
        super('Route not found');

        // only because we are extending a built class
        Object.setPrototypeOf(this, ErrorNotFound.prototype);
    }
    serializeErrors(){
        return [{ message: 'Not found'}];
    }
       
}

export { ErrorNotFound };