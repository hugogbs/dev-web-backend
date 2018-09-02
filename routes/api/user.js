const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.get("/:id", (req, res) =>
  res.json([
    { user_id: "pode vir", name: "Sucesso" },
    { user_id: "Cara lavada", name: "Água e Sabão" }
  ])
);

// @route   POST api/users/resgister
// @desc    Register user
// @access  Public
router.post("/register", (req, res) =>
  res.json({ temp: "Registro do usuário" })
);

// @route   GET api/users/login
// @desc    User login
// @access  Public
router.get("/login", (req, res) => res.json({ temp: "Login do usuário" }));

// @route   GET api/users/:id/profile
// @desc    User profile information
// @access  Private
router.get("/:id/profile", (req, res) =>
  res.json({ temp: "Perfil do usuário " + req.params.id })
);

module.exports = router;
