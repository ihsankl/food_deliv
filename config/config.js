const mysql = require('mysql2');
// const mysql = require('mysql');
const host = process.env.DB_SERVER;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

// const {DB_SERVER,DB_USER,DB_PASSWORD,DB_DATABASE} = process.env

const conn = mysql.createConnection({
  host,
  user,
  password: pass,
  database,
});

module.exports = conn;
