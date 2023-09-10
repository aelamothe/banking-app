const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://aelamothe:HyuPkyDt0ELbiNRr@anastasia-bankingapp.s8yjk2o.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return client.db(); // Return the database object
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
