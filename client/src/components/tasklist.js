import React, { useState } from "react";
import TaskCard from "./taskCard";
import EnterArea from "./enterArea";
import AddButton from "./addButton";
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from "react-icons/vsc";
import API from "./api";
import cuttingStr from "./shaping";

function TaskList(props) {
  const [tasks, setTasks] = useState(props.task);
  const [editable, setEditable] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [newAddition, setNewAddition] = useState(false);
  const [tasklistID] = useState(props.id);
  const [listName, setListName] = useState(props.name);

  const keyPress = (e, path, data) => {
    if (e.which === 13 && listName.length) {
      setEditable(false);
      API.put(path, {
        data
      })
        .then(response => {
          setListName(cuttingStr(response.data.listName));
        })
        .catch(err => {
          window.location.reload();
        })
    }
  }

  const handleSubmit = (e, path, data) => {
    e.preventDefault();
    if (taskName.length === 0) return;

    API.post(path, {
      data
    })
      .then(response => {
        const { taskID, taskName } = response.data;
        const newTask = { id: taskID, TaskName: taskName };
        setTasks([...tasks, newTask])
        setNewAddition(false)
        setTaskName("");
      })
      .catch(err => {
        window.location.reload();
      })
  }

  const deleteTask = (path, data, id) => {
    API.delete(path, {
      data
    })
      .catch(() => {
        window.location.reload();
      })

    const remainTasks = tasks.filter(task => id !== task.id);
    setTasks(remainTasks);
  }

  const taskList = tasks
    .map(task => (
      <TaskCard
        id={task.id}
        key={task.id}
        name={task.TaskName}
        deleteTask={deleteTask}
      />
    ))

  const enterTaskName =
    <EnterArea
      handleSubmit={(e) => handleSubmit(e, "task", { taskName: taskName, tasklistID: tasklistID })}
      wrap="enter-task-name m-3"
      handleChange={(e) => setTaskName(e.target.value)}
      text="Add Task"
      placeholder="Enter task name..."
      cancel={(e) => {
        e.preventDefault()
        setNewAddition(false)
      }}
    />

  const addTaskBtn =
    <AddButton
      addElement={() => setNewAddition(true)}
      text="Add a Card"
    />

  const taskListName =
    <>
      <h5 className="listName" onClick={() => setEditable(true)}>{listName}</h5>
      <div className="trash-box-icon"
        onClick={() => props.deletelist('tasklist', { listid: props.id }, props.id)}
      >
        <VscClose />
      </div>
    </>

  const textArea =
    <TextareaAutosize
      className="section-title w-100"
      onKeyPress={(e) => keyPress(e, "tasklist", { listid: tasklistID, listName: listName })}
      onChange={(e) => setListName(e.target.value)}
      autoFocus={true}
      defaultValue={listName}
    />

  return (
    <div className="vh-100">
      <div className="mx-2 list-wrapper">
        <div className="mx-3">
          <div className="pt-3 sectionName-wrap">
            {editable ? textArea : taskListName}
          </div>
        </div>
        <div className="task-cards">
          {taskList}
        </div>
        {newAddition ? enterTaskName : addTaskBtn}
      </div>
    </div>
  )
}


export default TaskList;
