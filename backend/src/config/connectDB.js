import mongoose from "mongoose";
import logger from "../helpers/winston.log.js";

const connectToMongoDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        logger.info("Connected to MongoDB");
      })
      .catch((err) => {
        logger.error("Error connecting to MongoDB", err.message);
      });
  } catch (error) {
    logger.error("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;
