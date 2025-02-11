const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/user/signup', (req, res) => {
    res.render('signup', { oldData: {} });
});

userRouter.post('/user/signup', userController.signup);

userRouter.get('/user/login', (req, res) => {
  res.render('login');
});

module.exports = userRouter;
