const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User" // Ver como fazer essa referência corretamente
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
