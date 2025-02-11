const pool = require('./pool');

const checkUserExists = async (email) => {
  const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
  return result.rows.length > 0;
};

const insertUser = async (first_name, last_name, email, password, membership_status) => {
  const query =
    'INSERT INTO "users" (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await pool.query(query, [first_name, last_name, email, password, membership_status]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM "users" WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  checkUserExists,
  insertUser,
  getUserByEmail,
  getUserById,
};