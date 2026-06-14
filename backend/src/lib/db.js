import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();    

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Please provide MONGO_URI");
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);   
    // 1 means failed 0 means sucess  
  }
}

export default connectDB;
