# Project Setup

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PostgreSQL**: [Download and install PostgreSQL](https://www.postgresql.org/download/)
- **Node.js**: [Download and install Node.js](https://nodejs.org/)

## Step 1: Clone the Project

1. Clone the project repository to your local machine using Git:
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name

## Step 2: Set Up the PostgreSQL Database

1. Open your terminal and log into PostgreSQL as the `postgres` user:
   ```bash
   psql -U postgres

2. Create the database for the project:
   ```sql
   create database image_board;

## Step 3: Install NPM Packages
1. In your project directory, install the required dependencies:
   ```bash
   npm i

## Step 4: Set Up the Database
1. Run the setup script to initialize the database schema:
   ```bash
   node model/setup_db_script.js
2. Execute the SQL commands from the package connect-pg-simple to set up necessary tables:
   ```bash
   psql -U postgres -d image_board < node_modules/connect-pg-simple/table.sql

## Step 5: Create a .env File
1. You need to create a .env file in the root directory of the project with the following environment variables:
   ```bash
   username=<username>
   password=<password>
   db_name=<db_name>
   session_password=<session_password>
   admin_password=<admin_password>
   mod_password=<mod_password>

## Step 6: Start the Application
1. Once the database is set up and the .env file is created, you can start the application:
   ```javascript
   npm --watch start

2. The application should now be running locally at http://localhost:3000.
