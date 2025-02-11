const pool = require('./pool');

const checkUserExists = async (email) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    return result.rows.length > 0;
};

const insertUser = async (first_name, last_name, email, password, membership_status) => {
    const query = 'INSERT INTO "Users" (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [first_name, last_name, email, password, membership_status]);
};

module.exports = {
    checkUserExists,
    insertUser,
};
