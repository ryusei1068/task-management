const express = require("express");
const router = express.Router();

const updateItem = require("../src/updateItem");
const insertItem = require("../src/insertItem");
const deleteItem = require("../src/deleteItem");
const sanitize = require("../src/sanitize");

const db = require("../db/models/index");
const task = db.sequelize.models.Task;

router.post("/", (req, res) => {
    const { tasklistID, taskName } = req.body.data;
    const taskname = sanitize(taskName);

    insertItem(task, {TaskName: taskname, tasklistid: tasklistID})
    .then(newTask => {
        res.status(201)
        .json({
            taskID : newTask.id,
            taskName: newTask.TaskName
        })
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
    const taskid = req.body.id;

    deleteItem(task, {id: taskid})
    .then(() => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.sendStatus(500);
    })
})

router.put("/", (req, res) => {
    const { id, TaskName } = req.body.data;
    const newTaskName = sanitize(TaskName);

    updateItem(task, {TaskName: newTaskName}, {id: id})
    .then(() => {
        res.status(200)
        .json({
            TaskName: newTaskName
        })
    })
    .catch(err => {
        res.sendStatus(500);
    })
});

module.exports = router;
