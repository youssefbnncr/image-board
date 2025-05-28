#! /usr/bin/env node

require('dotenv').config()
const {Client} = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  avatar TEXT DEFAULT 'default.jpg'
);
`;

async function main() {
  console.log('creating ...');
    const client = new Client({
    connectionString: `postgresql://${process.env.username}:${process.env.password}@localhost:5432/${process.env.db_name}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();