
const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.get("/:id", (req, res) => res.json([{ user_id: "pode vir", name : "Sucesso" }]));

module.exports = router;