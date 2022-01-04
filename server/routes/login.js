const crypto = require('crypto');
const express = require("express");
const router = express.Router();
const issueCookie = require("../src/issueCookie");
const hashing = require("../src/hash");
const db = require("../db/models/index");
const User = db.sequelize.models.User;

router.post("/", (req, res) => {
  const {username, password} = req.body;
  const hash = hashing(password);
  User.findAll({where : {username : username, password : hash}})
    .then(user => {
      if (user.length === 0) {
        return res.json(
          {"result" : {"code" : 403, "message" : "failed login"}})
      }
      const {id, username} = user[0].dataValues;
      const data = issueCookie(id, username);
      const keys = Object.keys(data);
      const oneHour = 60 * 60 * 1000;
      keys.forEach(key => {
        res.cookie(key, data[key], 
          {
            httpOnly : key === "authenticated" ? false : true,
            maxAge : oneHour,
            secure : true,
            sameSite : "lax"
          }
        )
      });
        res.json({"result" : {"code" : 201, "message" : "success"}})
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
});

module.exports = router;
