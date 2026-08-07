import mongoose from "mongoose";

// Connect MongoDB Database
export const connectDb = async () => {
  try {
    // Connect to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log database connection error
    console.log("Error while connecting to MongoDB:", error);

    // Stop server if database connection fails
    process.exit(1);
  }
};
