import mongoose from 'mongoose';
import { MONGO_URI } from '../commons/env.mjs';

export const starConnection = async () => {
  const url = encodeURI(MONGO_URI);
  await mongoose.connect(url);
};

export const closeConnection = async () => {
  await mongoose.connection.close();
};

export default starConnection;
