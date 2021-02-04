import { ValidationError} from 'express-validator';
import { ErrorAbstract } from './errorAbstract';

class ErrorDBConnection extends ErrorAbstract {

    statusCode = 500;
    reason = 'Error connecting to db';
    
    constructor (){
        super('Database error');

        // only because we are extending a built class
        Object.setPrototypeOf(this, ErrorDBConnection.prototype);
    }

    serializeErrors(){
        return [
            {
                message: this.reason
            }
        ]
    }
}

export { ErrorDBConnection };
