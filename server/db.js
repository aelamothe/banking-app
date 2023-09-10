// connects to MongoDB database
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://aelamothe:HyuPkyDt0ELbiNRr@anastasia-bankingapp.s8yjk2o.mongodb.net/users?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
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
