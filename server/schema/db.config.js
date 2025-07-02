const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connectionInfo = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 10000,
  acquireTimeout: 10000  
});

module.exports = connectionInfo;

