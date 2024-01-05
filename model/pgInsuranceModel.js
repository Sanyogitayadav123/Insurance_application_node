// model/pgInsuranceModel.js
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

// Create the insuranceapp table if it does not exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS insuranceapp (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(255) NOT NULL,
    address_state VARCHAR(255) NOT NULL,
    address_zipCode VARCHAR(255) NOT NULL,
    vehicles JSONB
  );
`;

// Run the table creation query
pool
  .query(createTableQuery)
  .then(() => console.log('Table created successfully'))
  .catch((error) => console.error('Error creating table:', error));

const Insurance = {
  create: async (data) => {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        'INSERT INTO insuranceapp (firstName, lastName, dateOfBirth, address_street, address_city, address_state, address_zipCode, vehicles) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          data.firstName,
          data.lastName,
          data.dateOfBirth,
          data.address.street,
          data.address.city,
          data.address.state,
          data.address.zipCode,
          JSON.stringify(data.vehicles),
        ],
      );
      return rows[0];
    } finally {
      client.release();
    }
  },
  findById: async (id) => {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        'SELECT * FROM insuranceapp WHERE id = $1',
        [id],
      );
      return rows[0];
    } finally {
      client.release();
    }
  },
  findByIdAndUpdate: async (id, newData) => {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        'UPDATE insuranceapp SET firstName = $1, lastName = $2, dateOfBirth = $3, address_street = $4, address_city = $5, address_state = $6, address_zipCode = $7, vehicles = $8 WHERE id = $9 RETURNING *',
        [
          newData.firstName,
          newData.lastName,
          newData.dateOfBirth,
          newData.address.street,
          newData.address.city,
          newData.address.state,
          newData.address.zipCode,
          JSON.stringify(newData.vehicles),
          id,
        ],
      );
      return rows[0];
    } finally {
      client.release();
    }
  },
};

export default Insurance;
