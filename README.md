### How to setup the project localy

## Create database localy using postgres
1. psql -U postgres
2. create database image_board;

## install npm packages
1. npm i

## setup databases by running:
1. node model/setup_db_script.js
2. psql -U postgres -d image_board < node_modules/connect-pg-simple/table.sql
