const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const queries = require('../db/queries');

exports.signup = async (req, res) => {
  await body('first_name').notEmpty().withMessage('First name is required').run(req);
  await body('last_name').notEmpty().withMessage('Last name is required').run(req);
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
  await body('confirm_password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signup', { messages: { error: errors.array().map(err => err.msg) }, oldData: req.body });
  }

  const { first_name, last_name, email, password } = req.body;
  try {
    const userExists = await queries.checkUserExists(email);
    if (userExists) {
      return res.status(400).render('signup', { messages: { error: ['Email is already in use'] }, oldData: req.body });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await queries.insertUser(first_name, last_name, email, hashedPassword, false);

    res.render('login', { messages: { success: ['Signup successful! Please log in.'] } });
  } catch (error) {
    console.error(error);
    res.render('signup', { messages: { error: ['An error occurred, please try again.'] }, oldData: req.body });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render('login', { messages: { error: [info.message] } });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
};
