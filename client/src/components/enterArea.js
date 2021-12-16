import React from "react";
import { VscClose } from "react-icons/vsc";

const EnterArea = (props) => {
    return (
        <div className={`${props.wrap}`}>
            <form onSubmit={props.handleSubmit}>
                <input className="m-1" type="text" autoFocus={true} placeholder={props.placeholder} maxLength="500" onChange={props.handleChange} />
                <div className={props.add}>
                    <button className="btn btn-secondary m-1" type="submit">{props.text}</button>
                    <button className="btn" onClick={props.cancel}><VscClose/></button>
                </div>
            </form>
        </div>
    )
}


export default EnterArea;
