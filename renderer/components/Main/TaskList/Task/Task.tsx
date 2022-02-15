import { useState } from "react";
import classes from "./Task.module.css";
import TaskBody from "./TaskBody";
import Checkbox from "./Checkbox";

const Task: React.FC<{ id: string; title: string; description: string }> = (
    props
) => {
    return (
        <li className={classes.listitem}>
            <Checkbox />
            <TaskBody title={props.title} description={props.description} />
        </li>
    );
};

export default Task;
