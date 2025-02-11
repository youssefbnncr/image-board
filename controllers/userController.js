const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const queries = require('../db/queries');

const signup = async (req, res) => {
  await body('first_name', 'First name is required').notEmpty().run(req);
  await body('last_name', 'Last name is required').notEmpty().run(req);
  await body('email', 'Please provide a valid email').isEmail().run(req);
  await body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).run(req);
  await body('confirm_password', 'Passwords must match').custom((value, { req }) => value === req.body.password).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('signup', {
      errors: errors.array(),
      oldData: req.body,
    });
  }

  const { first_name, last_name, email, password } = req.body;

  try {
    const userExists = await queries.checkUserExists(email);
    if (userExists) {
      req.flash('error', 'Email is already in use');
      return res.status(400).redirect('/user/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await queries.insertUser(first_name, last_name, email, hashedPassword, false);

    req.flash('success', 'Signup successful, please log in!');
    res.redirect('/user/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred, please try again');
    res.redirect('/user/signup');
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/user/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/user/dashboard');
    });
  })(req, res, next);
};

const dashboard = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/user/signup');
  }
  res.render('dashboard', { user: req.user });
};

module.exports = {
  signup,
  login,
  dashboard,
};