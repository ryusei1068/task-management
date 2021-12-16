import React, { useState, useLayoutEffect } from "react";
import { VscClose } from "react-icons/vsc";
import TextareaAutosize from 'react-textarea-autosize';
import "../styles/modal.css";
import API from "./api";

function Modal(props) {
    const [description, setDescription] = useState("");
    const [taskid] = useState(props.taskid);
    const [editable, setEditable] = useState(false);
    const [detailID, setDetailID] = useState();

    useLayoutEffect(() => {
        API.get("detail", {
            params: {
                id: taskid
            },
        })
        .then(response => {
            const { status } = response;
            if (status === 200) {
                const { id, description } = response.data;
                setDescription(description);
                setDetailID(id);
            }
            else {
                setEditable(true);
            }
        })
        .catch(err => {
            window.location.reload();
        })
    }, [taskid])

    const saveDescripion = (path, data) => {
        setEditable(false);
        API.put(path, {
            data
        })
        .then(response => {
            const { id, description } = response.data;
            setDetailID(id);
            setDescription(description);
        })
        .catch(err => {
            window.location.reload();
        })
    }   

    const textArea =
        <TextareaAutosize 
            className="text-area-for-descripton"
            onChange={(e) => setDescription(e.target.value)}
            autoFocus={true}
            placeholder={"description..."}
        />
    
    const detail =
            <p className="card-text" onClick={() => setEditable(true)}>{description}</p>
    
    return (
        <div id="overlay">
            <div id="content">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4 className="card-title">{props.taskName}</h4>
                            <div className="close" onClick={() => props.setOpen(false)}>
                                <VscClose />
                            </div>  
                        </div>
                        <h5 className="description">description</h5>
                        <div >
                            {editable ? textArea : detail}
                        </div>
                        <button className="btn btn-secondary" onClick={() => saveDescripion("detail", {description : description, taskid: taskid, id: detailID})}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
