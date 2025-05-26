const db = require("../model/queries");

// Views
const register = (req,res) => {
    res.render('sign-up',{current_path:req.params});
}

const login = (req,res) => {
    res.render('sign-in',{current_path:req.params})
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