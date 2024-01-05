import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to database!'))
    .catch((err) => console.log("Couldn't connect to database : ", err));
};

export default connectDB;
