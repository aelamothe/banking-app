// connects to MongoDB database
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    // connect to mongodb that lives in Docker host container
    await mongoose.connect("mongodb://mongo-db/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
