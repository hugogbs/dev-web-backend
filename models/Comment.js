const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Comment Schema

const CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    // type: Schema.Types.ObjectId,
    // ref: "User" // Ver como fazer essa referência corretamente
    type: String,
    required: true
  },
  parent: {
    // type: Schema.Types.ObjectId,
    // ref: "Posts" // Ver como fazer essa referência corretamente
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
