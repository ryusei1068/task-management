const crypto = require('crypto');
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const generateToken = require("../src/token");

const db = require("../db/models/index");
const User = db.sequelize.models.User;

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const hash = crypto.createHmac('sha256', password)
    .update('I love ice cream')
    .digest('hex');

  User.findAll({
    where: {
      username: username,
      password: hash
    }
  })
    .then(user => {
      if (user.length === 0) {
        return res.json({ "result": { "code": 403, "message": "failed login" } })
      }

      const { id, username } = user[0].dataValues;
      const token = generateToken({ username: username });
      const uuid = uuidv4();
      const oneHour = 60 * 60 * 1000;
      res.cookie('token', token, { httpOnly: true, maxAge: oneHour, secure: true, sameSite: "lax" });
      res.cookie("indiv", id, { httpOnly: true, maxAge: oneHour, secure: true, sameSite: "lax" });
      res.cookie("authenticated", uuid, { maxAge: oneHour, secure: true, sameSite: "lax" });
      res.json({ "result": { "code": 201, "message": "success" } })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

module.exports = router;
