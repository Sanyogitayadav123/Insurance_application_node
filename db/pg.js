import pkg from 'pg';
import * as dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();
const pool = new Pool({
  user: process.env.POSTGRES_USER_NAME,
  host: process.env.HOST_NAME, // or your database host
  database: process.env.DATABASE_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT, // or your database port
});

const connectDBPg = async () => {
  try {
    await pool.connect();
    console.log('Connected to database!');
  } catch (err) {
    console.error("Couldn't connect to database:", err);
  }
};

export default connectDBPg;
``;
