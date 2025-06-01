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
        failureRedirect: "/user/login",
        failureFlash: true
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


// Avatar
const settings = (req,res) => {
    res.render("user-settings");
}

const change_avatar = async (req, res) => {
    try {
        const {filename} = req.file;
        const userId = req.user.id;
        await db.change_avatar(userId, filename);
        res.redirect("/user/user-settings");
    } catch (err) {
        console.error("Avatar update error:", err);
        res.status(500).send("Error updating avatar");
    }
};

module.exports = {
    signup,
    signin,
    addUser,
    login,
    logout,
    settings,
    change_avatar,
}