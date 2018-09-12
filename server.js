const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

const users = require("./routes/api/user");
const posts = require("./routes/api/post");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgan middleware - Logging
app.use(morgan("tiny"));

// Static files connection
app.use("/public", express.static("./static"));

app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

// Use routes
app.use("/api/user", users);
app.use("/api/post", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/api", (req, res) => res.json({ msg: "Olha o pisão!" }));

module.exports = app;