import mongoose from "mongoose";
import { ENV_VARS } from "../constants/index.js";

export const initMongoConnection = async () => {
  const connectionLink = `mongodb+srv://${ENV_VARS.DB_USER}:${ENV_VARS.DB_PASSWORD}@cluster0.lc6ql.mongodb.net/${ENV_VARS.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(connectionLink);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
