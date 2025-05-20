const db = require("../model/queries");

// Views
const register = (req,res) => {
    res.render('sign-up');
}

const login = (req,res) => {
    res.render('sign-in')
}

// Database
const signup = async(req,res) => {
    const {username, password} = req.body;
    await db.signup(username,password);
    res.redirect('/');
}

module.exports = {
    register,
    login,
    signup
}