import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './db/db.js';
import route from './routes/insuranceRoute.js';
import cors from 'cors';
import connectDBPg from './db/pg.js';

const app = express();
dotenv.config();

// connectDB()
connectDBPg();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/api', route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
