const user = require('../controllers/userControllers')
const {Router} = require('express');
const userRouter = Router();

userRouter.get('/register',user.register)

userRouter.get('/login',user.login)

module.exports = userRouter;