import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;

  const connectionLink =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}` +
    `@cluster0.lc6ql.mongodb.net/${DB_NAME}` +
    `?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(connectionLink);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Mongo connection error:', error);
    throw error;
  }
};
