const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const gravatar = require("gravatar");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already used";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
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
// @desc    User login / Returning JTW Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by username
  User.findOne({ email }).then(user => {
    // Adicionar validação das entradas do usuário
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          username: user.username,
          name: user.name,
          surname: user.surname,
          avatar: user.avatar
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
      } else {
        console.log("not match");
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      username: req.user.username,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email
    });
  }
);

module.exports = router;
