import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { MONGO_URI = '' } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  if (!mongoose.connection.readyState) {
    console.log('Connecting to ', MONGO_URI);
    mongoose.connect(MONGO_URI, options);
  }
};
