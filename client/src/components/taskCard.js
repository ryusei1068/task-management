import React, { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from "react-icons/ai";
import API from "./api";
import cuttingStr from "./shaping";
import Modal from "./modal";
import "../styles/taskCard.css";


function TaskCard(props) {
    const [editable, setEditable] = useState(false);
    const [taskName, setTaskName] = useState(props.name);
    const [taskID] = useState(props.id);
    const [isOpen, setOpen] = useState(false);

    const keyPress = (e, path, data) => {
        if (e.which === 13 && taskName.length) {
            setEditable(false)
            API.put(path, {
                data
            })
            .then(response => {
                setTaskName(response.data.TaskName);
            })
            .catch(err => {
                window.location.reload();
            })
        }
    }

    const task =  
            <>
                <p className="task-name" onClick={() => setEditable(true)}>{cuttingStr(taskName)}</p>
            </>

    const textArea =
                <TextareaAutosize 
                    className="task-name"
                    onKeyPress={(e) => keyPress(e, "task", {id: taskID, TaskName: taskName})} 
                    onChange={(e) => setTaskName(e.target.value)}
                    autoFocus={true}
                />
        
    return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header d-flex align-items-center">
                    {editable ? textArea : task}
                    <div className="d-flex flex-column">
                        <div className="trash-box-icon" 
                            onClick={() => props.deleteTask("task", { id: props.id }, props.id)} >
                            <BsTrash />
                        </div>
                        <div className="edit-icon" onClick={() => setOpen(true)}>
                            <AiOutlineEdit />
                        </div>
                    </div>
                </div>
                {isOpen ? <Modal setOpen={setOpen} taskName={taskName} taskid={taskID}/> : null}
            </div>
        )
}


export default TaskCard;
