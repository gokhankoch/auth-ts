import { Request, Response, NextFunction} from 'express';
import { ErrorAbstract } from '../errors/errorAbstract';

export const errorHandler =(  
    err: Error,
    req: Request,
    res: Response, 
    next: NextFunction
    ) => {

    if( err instanceof ErrorAbstract){
        return res.status(err.statusCode).send({ errors : err.serializeErrors() });
    }
    
    res.status(400).send({
        errors: [{message :' Something went wrong'}]
    });
};