const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const queries = require('../db/queries');

const signup = async (req, res) => {
    await check('first_name', 'First name is required').notEmpty().run(req);
    await check('last_name', 'Last name is required').notEmpty().run(req);
    await check('email', 'Please provide a valid email').isEmail().run(req);
    await check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).run(req);
    await check('confirm_password', 'Passwords must match').custom((value, { req }) => value === req.body.password).run(req);

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
            return res.status(400).redirect('/users/signup');
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

module.exports = {
    signup,
};
