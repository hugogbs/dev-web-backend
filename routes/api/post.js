const express = require("express");
const router = express.Router();

module.exports = router;

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.post("/new", (req, res) => res.json({ msg: "Criação de um novo post" }));

router.get("/", (req, res) => res.json({ msg: "Recupera os posts" }));

router.get("/:id", (req, res) =>
  res.json({ msg: "Recupera o post " + req.params.id })
);

router.delete("/:id", (req, res) =>
  res.json({ msg: "Apaga o post " + req.params.id })
);

router.post("/:id", (req, res) =>
  res.json({ msg: "Cria o post " + req.params.id })
);
