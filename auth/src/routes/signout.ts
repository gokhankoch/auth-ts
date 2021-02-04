import express from 'express';

const router = express.Router();

router.route('/').post((req , res)=>{
  req.session = null;

  res.send({});
})

export { router as signoutRouter};