const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

// mongoose.connect('mongodb://localhost:4000/test', { useNewUrlParser: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

const app = express();

app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

const users = require("./routes/api/user");
const posts = require("./routes/api/post");

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(passport.session());

// CORS
var corsOptions = {
  origin: "http://localhost", // habilita CORS apenas em produção
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongo DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/user", users);
app.use("/api/post", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    req.login(user, err => {
      return res.json({ msg: "You were authenticated & logged in!" });
    });
  })(req, res, next);
});

app.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ msg: "you hit the authentication endpoint" });
  } else {
    res.json({ msg: "voce precisa logar" });
    res.redirect("/");
  }
});

module.exports = app;
