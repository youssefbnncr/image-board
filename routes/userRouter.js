const express = require('express');
const userRouter = express();

userRouter.get('/users/signup',(req,res)=>{
  res.render('signup');
})

module.exports = userRouter;