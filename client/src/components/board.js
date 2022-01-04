import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/board.css";

import React, {useEffect, useState} from "react";

import AddButton from "./addButton";
import API from "./api";
import EnterArea from "./enterArea";
import Navbar from "./navbar";
import cuttingStr from "./shaping";
import Tasklist from "./tasklist";

function Board(props) {
  const [tasklist, setTasklist] = useState(props.tasklist);
  const [listName, setListName] = useState("");
  const [dynamisation, setDynamisation] = useState(false);

  useEffect(() => {API.get("board")
      .then(response => {
        const data = response.data
        setTasklist(data);
      })
      .catch(() => { })}
    ,[]);

  const handleSubmit = (e, path, data) => {
    e.preventDefault();
    if (listName.length === 0) return;

    API.post(path, {data})
      .then(response => {
        const {tasklistID, listName, Tasks} = response.data;
        const newList = {
          id : tasklistID,
          listName : listName,
          Tasks : Tasks
        };
        setTasklist([...tasklist, newList ]);
        setDynamisation(false);
        setListName("");
      })
      .catch(() => { window.location.reload(); });
  }

  const deletelist = (path, data, id) => {
    API.delete(path, {data}).catch(() => { window.location.reload(); })
    const remainlist = tasklist.filter(list => id !== list.id);
    setTasklist(remainlist);
  }

  const enterArea = 
    <EnterArea 
      handleSubmit = {(e) => handleSubmit(e, "tasklist", {listName : listName})} 
      wrap = "enter-section-name-wrap"
      handleChange = {(e) => setListName(e.target.value)} 
      text = "Add List"
      placeholder = "Enter list title..."
      cancel={(e) => {e.preventDefault(); setDynamisation(false)}}
    />

  const addAnotherListBtn =
    <AddButton
      addElement={() => setDynamisation(true)}
      text="Add another list"
      ClassName="add-list"
    />

  const sectionList = tasklist
    .map(section => (
      <Tasklist
        id={section.id}
        key={section.id}
        name={cuttingStr(section.listName)}
        deletelist={deletelist}
        task={section.Tasks}
      />
    ))

  return (
    <>
      <Navbar authenticate={props.authenticate} />
      <div className="board-wrapper">
        <div className="board-canvas">
          {sectionList}
          <div className="mx-1">
            {dynamisation ? enterArea : addAnotherListBtn}
          </div>
        </div>
      </div>
    </>
  )
}

export default Board;
