const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authMiddleware');

authRouter.get('/', ensureAuthenticated, async (req,res) => {
  const posts = await authController.getPosts();
  res.render('home', { user: req.user, posts });
});

authRouter.get('/signup', forwardAuthenticated, (req, res) => {
  res.render('signup', { oldData: {}, messages: {} });
});

authRouter.post('/signup', authController.signup);

authRouter.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { messages: {} });
});

authRouter.post('/login', authController.login);

authRouter.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
