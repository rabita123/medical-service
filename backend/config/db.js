import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...'.yellow);
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('MongoDB URI:', mongoURI);
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error('MongoDB connection error:'.red.bold);
    console.error(error.message.red);
    console.error('Full error:'.red);
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
