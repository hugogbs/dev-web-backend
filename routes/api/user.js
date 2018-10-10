const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "Email already used";
      return res.status(400).json.errors;
    } else {
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log("a", newUser);
            console.log("b", req.body);
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    User login
// @access  Public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "User not found";
      return res.status(400).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          username: user.username,
          name: user.name,
          surname: user.surname
        }; // Create a Jwt payload

        jwt.sign(
          payload,
          keys.secretOrkey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  });
});

// @route   GET api/users/:id/profile
// @desc    User profile information
// @access  Private
router.get("/:id/profile", (req, res) =>
  res.json({ temp: "Perfil do usuário " + req.params.id })
);

module.exports = router;
