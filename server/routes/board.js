const express = require("express");
const router = express.Router();

const db = require("../db/models/index");
const tasklist = db.sequelize.models.TaskList;
const task = db.sequelize.models.Task;

router.get("/", (req, res) => {
  const {indiv} = req.cookies;
  if (indiv === "") return ;
  tasklist.findAll({
    attributes : [ "id", "listName" ],
    where : {userid : indiv},
    include : [ {
      model : task,
      require : true,
      attributes : [
        "id",
        "TaskName",
      ],
    } ],
    order : [ [ "id", "ASC" ], [ task, "id", "ASC" ] ]
  })
  .then(tasklistAndTask => {
    let listAndTask = [];
    for (const list of tasklistAndTask) {
      listAndTask.push(list.dataValues)
    }
    res.status(200).json(listAndTask);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

module.exports = router;
