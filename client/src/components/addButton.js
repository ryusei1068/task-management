import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddButton = (props) => {
    return (
        <button className={`btn ${props.ClassName}`} onClick={props.addElement}>
            <AiOutlinePlus/> {props.text}
        </button>
    )
}


export default AddButton;
