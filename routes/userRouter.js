const user = require('../controllers/userControllers');
const { signupValidation } = require('../model/queries');
const { Router } = require('express');
const userRouter = Router();

userRouter.get('/register', user.sigup);
userRouter.get('/login', user.signin);

userRouter.post('/add-user', signupValidation, user.addUser);

module.exports = userRouter;
