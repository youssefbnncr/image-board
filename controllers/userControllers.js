require("dotenv").config();
const db = require("../model/queries");
const { validationResult } = require("express-validator");
const passport = require("passport");

// Views
const signup = (req, res) => {
  res.render("sign-up", { current_path: req.path });
};

const signin = (req, res) => {
  res.render("sign-in", { current_path: req.path });
};

// Signin and Signup
const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    await db.signup(username, password);
    res.redirect("/");
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).send("Server error");
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Avatar
const settings = (req, res) => {
  res.render("user-settings");
};

const change_avatar = async (req, res) => {
  try {
    const user_id = req.user.id;
    const avatar = req.file.filename;
    await db.updateUserAvatar(user_id, avatar);
    res.redirect("/user/user-settings");
    console.log("Uploaded avatar:", req.file);
  } catch (err) {
    console.error("Avatar update error:", err);
    res.status(500).send("Error updating avatar");
  }
};

const getVerify = async (req, res) => {
  res.render("verify");
};

const postVerify = async (req, res) => {
  const { pass_phrase } = req.body;
  let role;
  if (pass_phrase === `${process.env.mod_password}`) {
    role = 1;
  } else if (pass_phrase === `${process.env.admin_password}`) {
    role = 2;
  } else {
    res.redirect("/");
  }
  try {
    await db.updateUsersRole(req.user.id, role);
    console.log("User got new role");
    res.redirect("/");
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
};

const admin = async (req, res) => {
  try {
    const users = await db.getUsers();
    res.render("admin", { users });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
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
  getVerify,
  postVerify,
  admin,
};
