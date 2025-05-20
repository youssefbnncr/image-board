const register = (req,res) => {
    res.render('sign-in');
}

const login = (req,res) => {
    res.render('sign-up')
}

module.exports = {
    register,
    login
}