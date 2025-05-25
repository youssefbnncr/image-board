const pool = require('./pool')
const bcrypt = require('bcryptjs');

const signup = async(username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES (\$1, \$2)",[username,hashedPassword])
        console.log('New account has been created')
    } catch(e) {
        console.error("Error creating user:",e);
    }
}

module.exports = {signup};