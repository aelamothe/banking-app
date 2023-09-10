// setting up my tables
const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for my users table
const userSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  entryDate: { type: Date, default: Date.now },
  balance: { type: Decimal128 },
});

// sets up Users variable so we can call it in our project
// will create the table if not already present
const Users = mongoose.model("Users", userSchema, "users");

module.exports = { Users };
