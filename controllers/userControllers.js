const db = require("../model/queries");
const { validationResult } = require("express-validator");
const passport = require('passport');

// Views
const signup = (req,res) => {
    res.render('sign-up',{current_path:req.path});
}

const signin = (req,res) => {
    res.render('sign-in',{current_path:req.path})
}

// Signin and Signup
const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        await db.signup(username, password);
        res.redirect('/');
    } catch (e) {
        console.error("Signup error:", e);
        res.status(500).send("Server error");
    }
};

const login = async (req,res,next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login"
  })(req,res,next);
}

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
    signup,
    signin,
    addUser,
    login,
    logout
}