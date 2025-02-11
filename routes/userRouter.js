const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/user/signup', (req, res) => {
    res.render('signup', { oldData: {}, messages: req.flash() });
});

userRouter.post('/user/signup', userController.signup);

userRouter.get('/user/login', (req, res) => {
    res.render('login', { messages: req.flash() });
});

module.exports = userRouter;
