import { ValidationError} from 'express-validator';
import { ErrorAbstract } from './errorAbstract'

 class ErrorRequestValidation extends ErrorAbstract{

     statusCode = 400;

    constructor (public errors : ValidationError[]){
        super('Invalid req params');

        // only because we are extending a built class
        Object.setPrototypeOf(this, ErrorRequestValidation.prototype);
    }
    serializeErrors(){
        return this.errors.map( error => {
            return { message: error.msg, field: error.param};
        })
    }
}

export { ErrorRequestValidation };