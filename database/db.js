// pour la connexion à mysql

import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createPool({
  host: DB_HOST || 'localhost',
  port: DB_PORT ? parseInt(DB_PORT) : 3306,
  user: DB_USER || 'aurelie',
  password: DB_PASSWORD || '',
  database: DB_NAME || 'back_bankroll',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

export default db;