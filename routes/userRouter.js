const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
  }
  res.redirect('/user/signup');
});

userRouter.get('/user/signup', (req, res) => {
  res.render('signup', { oldData: {}, messages: req.flash() });
});

userRouter.post('/user/signup', userController.signup);

userRouter.get('/user/login', (req, res) => {
  res.render('login', { messages: req.flash() });
});

userRouter.post('/user/login', userController.login);

userRouter.get('/user/dashboard', userController.dashboard);

userRouter.get('/user/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/user/login');
  });
});

userRouter.get('/*', (req,res)=>{
  res.render('page404');
})

module.exports = userRouter;