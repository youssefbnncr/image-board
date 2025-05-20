const pool = require('./pool')

const signup = async(username, password) => {
    try {
    await pool.query("INSERT INTO users (username, password) VALUES (\$1, \$2)",[username,password])
    console.log('New account has been created')
    } catch(e) {
        console.error("Error creating user:",e);
    }
}

module.exports = {signup};