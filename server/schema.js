// defines User schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for my users table
const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  balance: { type: Number, default: 100 },
});

// sets up Users variable so we can call it in our project
// will create the table if not already present
const User = mongoose.model("user", UserSchema);

module.exports = User;
