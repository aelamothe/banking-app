// initializes server and defines API endpoints
const express = require("express");
const path = require("path");
const cors = require("cors"); // Import the cors package
const { connectToDatabase } = require("./db");
const User = require("./schema.js");

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "../build")));

// Add a POST route to create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Creating a new user
    user = new User({
      name,
      email,
      password,
      balance: 100, // You can set a default balance here
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
});

// Endpoint for GET user data
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
});

// Endpoint for verifying user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.json({ status: "success", user });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Incorrect credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Define a catch-all route to serve the React app in case of failure
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
