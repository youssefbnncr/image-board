#! /usr/bin/env node

require('dotenv').config()
const {Client} = require('pg')

const SQL = `CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  password VARCHAR(255)
)`;

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