import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'sanyogita',
  host: 'localhost', // or your database host
  database: 'postgres',
  password: 'Sanju@123',
  port: 5432, // or your database port
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
