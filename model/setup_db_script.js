#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  avatar TEXT DEFAULT 'default.jpg',
  role INT DEFAULT 0 -- 0: Default, 1: Moderator, 2: Admin
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Boards Table
CREATE TABLE IF NOT EXISTS boards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT REFERENCES users(id)
);

-- Threads Table
CREATE TABLE IF NOT EXISTS threads (
  id SERIAL PRIMARY KEY,
  board_id INT REFERENCES boards(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  image TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Replies Table
CREATE TABLE IF NOT EXISTS replies (
  id SERIAL PRIMARY KEY,
  thread_id INT REFERENCES threads(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  image TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("Creating tables...");
  const client = new Client({
    connectionString: `postgresql://${process.env.username}:${process.env.password}@localhost:5432/${process.env.db_name}`,
  });
  await client.connect();

  await client.query(SQL);

  console.log("Users Table created.");
  console.log("Categories Table created.");
  console.log("Boards Table created.");
  console.log("Threads Table created.");
  console.log("Replies Table created.");

  await client.end();
  console.log("All tables created successfully.");
}

main();
