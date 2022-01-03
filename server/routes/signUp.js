const crypto = require('crypto');
const express = require("express");
const router = express.Router();
const issueCookie = require("../src/issueCookie");
const db = require("../db/models/index");
const User = db.sequelize.models.User;

router.post("/", async (req, res) => {
  const {username, password} = req.body;

  const usernames = await User.count({where : {username : username}})
  if (username === undefined || usernames != 0) {
    return res.json({
      "result" :
          {"code" : 400, "message" : "The UserName is already being used"}
    })
  }

  const hash = crypto.createHmac('sha256', password)
                   .update('I love ice cream')
                   .digest('hex');

  User.create({username : username, password : hash})
      .then(user => {
        const {id, username} = user.dataValues;
        const oneHour = 60 * 60 * 1000;
        const data = issueCookie(id, username);
        const keys = Object.keys(data);
        keys.forEach(key => {res.cookie(key, data[key], {
                       httpOnly : key === "authenticated" ? false : true,
                       maxAge : oneHour,
                       secure : true,
                       sameSite : "lax"
                     })});
        res.json({"result" : {"code" : 201, "message" : "success"}})
      })
      .catch(() => {
        console.log("err");
        res.sendStatus(500);
      })
});

module.exports = router;
