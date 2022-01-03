const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  const keys = Object.keys(req.cookies);
  keys.forEach(key => { res.cookie(key, "", {maxAge : 0}); });
  res.sendStatus(204);
});

module.exports = router;
