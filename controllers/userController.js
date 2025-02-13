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
      messages: { error: errors.array().map(err => err.msg) }
    });
  }

  const { first_name, last_name, email, password } = req.body;

  try {
    const userExists = await queries.checkUserExists(email);
    if (userExists) {
      return res.status(400).render('signup', {
        oldData: req.body,
        messages: { error: ['Email is already in use'] }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await queries.insertUser(first_name, last_name, email, hashedPassword, false);

    return res.render('login', { messages: { success: ['Signup successful, please log in!'] } });
  } catch (error) {
    console.error(error);
    return res.render('signup', {
      oldData: req.body,
      messages: { error: ['An error occurred, please try again'] }
    });
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render('login', { messages: { error: [info.message] } });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/user/dashboard');
    });
  })(req, res, next);
};
