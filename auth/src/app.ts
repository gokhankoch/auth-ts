import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/errorHandler';
import { ErrorNotFound } from './errors/errorNotFound'
import { currentUserRouter} from './routes/currentuser';
import { signinRouter} from './routes/signin';
import { signoutRouter} from './routes/signout';
import { signupRouter} from './routes/signup';


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

// mounting
app.use('/api/users/currentuser',currentUserRouter);
app.use('/api/users/signin',signinRouter);
app.use('/api/users/signout',signoutRouter);
app.use('/api/users/signup',signupRouter);



// all means all http verb such as get, post delete
// '*' means all url
// this error handling part must be last all the time
app.all('*', async() => {
    throw new ErrorNotFound();
  });

  // Error handler
app.use(errorHandler);

export {app};