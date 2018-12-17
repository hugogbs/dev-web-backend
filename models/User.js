const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  birthday: {
    type: Date
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
