const express = require("express");
const router = express.Router();

const updateItem = require("../src/updateItem");
const insertItem = require("../src/insertItem");
const deleteItem = require("../src/deleteItem");
const sanitize = require("../src/sanitize");
const db = require("../db/models/index");
const tasklist = db.sequelize.models.TaskList;


router.post("/", (req, res) => {
    const { indiv } = req.cookies;
    const { listName } = req.body.data;

    insertItem(tasklist, {listName: sanitize(listName), userid: indiv})
    .then(newTaskList => { 
            res.status(201)
            .json(
            {
                tasklistID : newTaskList.id,
                listName: newTaskList.listName,
                Tasks: []
            }
        )
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

router.delete("/", (req, res) => {
    const { listid } = req.body;

    deleteItem(tasklist, {id: listid})
    .then(() => {
        res.sendStatus(204);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

router.put("/", (req, res) => {
    const { listid, listName } = req.body.data;
    const newListName = sanitize(listName);

    updateItem(tasklist, {listName: newListName}, {id: listid})
    .then(() => {
        res.status(200)
        .json({
            listName: newListName
        })
    })
    .catch(() => {
        res.sendStatus(500);
    })
});


module.exports = router;
