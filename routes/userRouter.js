const user = require('../controllers/userControllers');
const { signupValidation } = require('../model/queries');
const { Router } = require('express');
const userRouter = Router();

userRouter.get('/register', user.signup);
userRouter.get('/login', user.signin);
userRouter.get("/log-out", user.logout);

userRouter.post('/add-user', signupValidation, user.addUser);
userRouter.post('/userLogin', user.login);
userRouter.port('/log-out', user.logout);

module.exports = userRouter;
