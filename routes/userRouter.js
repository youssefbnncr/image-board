const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('home', { user: req.user });
  }
  res.redirect('/user/signup');
});

userRouter.get('/user/signup', (req, res) => {
  res.render('signup', { oldData: {}, messages: {} });
});

userRouter.post('/user/signup', userController.signup);

userRouter.get('/user/login', (req, res) => {
  res.render('login', { messages: {} });
});

userRouter.post('/user/login', userController.login);

userRouter.get('/user/dashboard', (req,res)=>{
  if(req.isAuthenticated()) {
    res.render('dashboard',{user: req.user});
  } else {
    res.redirect('/user/signup');
  }
});

userRouter.get('/user/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/user/login');
  });
});

userRouter.post('/update-membership', userController.updateMembership);

userRouter.get('/*', (req, res) => {
  res.render('page404');
});

module.exports = userRouter;