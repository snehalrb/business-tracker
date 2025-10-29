import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected succesfully!!");
  } catch (e) {
    console.log("Error connecting to database", e);
    process.exit(1);
  }
};
