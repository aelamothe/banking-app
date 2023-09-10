const express = require("express");
const path = require("path");
const cors = require("cors"); // Import the cors package
const { connectToDatabase } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "../build")));

// Define a catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Connect to MongoDB and start the server
async function startServer() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Additional server setup, routes, and middleware can use 'db' here

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
