const express = require("express");
const router = express.Router();

const deleteItem = require("../src/deleteItem");
const db = require("../db/models/index");
const user = db.sequelize.models.User;

router.delete("/", (req, res) => {
    const { indiv } = req.cookies;

    deleteItem(user, {id: indiv})
    .then(() => {
		res.cookie('token', "", { maxAge: 0 });
        res.cookie("indiv", "", { maxAge: 0 });
        res.cookie("authenticated", "", { maxAge: 0 });
        res.sendStatus(204);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

module.exports = router;
