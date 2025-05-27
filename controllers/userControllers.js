const db = require("../model/queries");
const { validationResult } = require("express-validator");

// Views
const sigup = (req,res) => {
    res.render('sign-up',{current_path:req.path});
}

const signin = (req,res) => {
    res.render('sign-in',{current_path:req.path})
}

// Database
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

module.exports = {
    sigup,
    signin,
    addUser
}