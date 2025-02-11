const { Pool } = require("pg");
require("dotenv").config();
module.exports = new Pool({
  connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
});