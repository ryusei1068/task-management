const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  res.cookie('token', "", {maxAge : 0});
  res.cookie("indiv", "", {maxAge : 0});
  res.cookie("authenticated", "", {maxAge : 0});
  res.sendStatus(204);
});

module.exports = router;
