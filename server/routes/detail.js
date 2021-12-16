const express = require("express");
const router = express.Router();

const updateItem = require("../src/updateItem");
const insertItem = require("../src/insertItem");
const sanitize = require("../src/sanitize");

const db = require("../db/models/index");
const detail = db.sequelize.models.Detail;

router.get("/", (req, res) => {
    const { id } = req.query;
    detail.findOne({  
        attributes: [
            "id", 
            "description"
        ],
        where: {
            taskid: id
        }
    })
    .then(detail => {
        if (detail === null) {
            res.sendStatus(204)
        }
        else {
            res.status(200).json(detail);
        }
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

router.put("/", (req, res) => {
    const { taskid, description, id } = req.body.data;
    const sanitizedDescription = sanitize(description);

    if (id === undefined) {
        insertItem(detail, {description: sanitizedDescription, taskid: taskid})
        .then(detail => {
            res.status(201)
            .json({
                id : detail.id,
                description: detail.description
            })
        })
        .catch(() => {
            res.sendStatus(500);
        })
    }
    else {
        updateItem(detail,  {description: sanitizedDescription}, {id: id})
        .then(() => {
            res.status(201)
            .json({
                id : id,
                description: sanitizedDescription
            })
        })
        .catch(() => {
            res.sendStatus(500);
        })
    }

})

module.exports = router;
