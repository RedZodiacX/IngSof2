import dotenv from 'dotenv';
// eslint-disable-next-line
//export const PORT = process.env.PORT || 5001;
dotenv.config();

export const {
  MONGO_URI, PORT, MINIO_HOST, MINIO_ACCESS_KEY, MINIO_SECRET_KEY,
} = process.env;
