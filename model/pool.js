require('dotenv').config();
const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: `postgresql://${process.env.username}:${process.env.password}@localhost:5432/${process.env.db_name}`
});