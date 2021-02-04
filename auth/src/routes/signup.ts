import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { requestValidate } from '../middlewares/requestvalidate';
import { User } from '../models/user';
import { ErrorBadRequest } from '../errors/errorBadRequest';

const router = express.Router();

router.route('/').post([
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
    ],
    requestValidate,
    async (req: Request , res: Response)=>{

    // get email and password
    const { email, password } = req.body;

    // check user exist?
    const exUser = await User.findOne({ email });
    if( exUser ){
       throw new ErrorBadRequest('Email in use');
        
    }
    // check email and password for mongoose and save database
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_KEY!
      );
  
      // Store it on session object
      req.session = {
        jwt: userJwt
      };
    
    res.status(201).send(user);
});

export { router as signupRouter};