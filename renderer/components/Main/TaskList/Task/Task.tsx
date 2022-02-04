import { useState } from "react";
import classes from "./Task.module.css";
import TaskForm from "./TaskForm";
import Checkbox from "./Checkbox";

const Task: React.FC<{ id: string; title: string }> = (props) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
    };

    return (
        <li className={classes.listitem} onClick={handleClick}>
            <Checkbox />
            <TaskForm title={props.title} isActive={isActive} />
        </li>
    );
};

export default Task;
