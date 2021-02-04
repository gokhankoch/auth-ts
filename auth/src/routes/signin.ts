import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { requestValidate } from '../middlewares/requestvalidate';
import { ErrorBadRequest } from '../errors/errorBadRequest';


const router = express.Router();

router.route('/').post([
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  requestValidate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ErrorBadRequest('Invalid credentials');
    }

    const passwordsMatch = await Password.IsEqual(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new ErrorBadRequest('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter};