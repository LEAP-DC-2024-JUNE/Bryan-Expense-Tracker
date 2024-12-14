const dotenv = require("dotenv").config({ path: "./configs/.env" });
const mongoose = require("mongoose");

// const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://duluuf:26cbDTaCYcsgTqw0@cluster1.pyncrqd.mongodb.net/duluu"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
