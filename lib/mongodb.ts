import mongoose from "mongoose";
import { buffer } from "stream/consumers";

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include the mongoose cache
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Validate the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Initialize the mongoose cache if it doesn't exist
let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Function to connect to MongoDB
async function connectDB(): Promise<typeof mongoose> {
  // If already connected, return the existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // return the existing promise if it's already in progress
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable mongoose buffering
    };
    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise on failure
    throw error;
  }
  return cached.conn;
}
