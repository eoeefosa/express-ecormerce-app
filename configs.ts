import dotenv from "dotenv";
import { connect } from "http2";
import mongoose from "mongoose";

dotenv.config();

export const { PORT, MONGOS_CONNECTION_LINK, JWT_SECERT, EXPIRES_IN } = process.env;

const DBConnection = async () => {
  try {
    await mongoose.connect(MONGOS_CONNECTION_LINK as string);
    console.log("MONGODB connected ........");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default {
  connect: DBConnection,
  port: PORT,
  JWT_SECERT: JWT_SECERT,
  EXPIRES_IN: EXPIRES_IN,
};
