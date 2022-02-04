import { Fragment } from "react";
import classes from "./TaskForm.module.css";

const TaskForm: React.FC<{ title: string; isActive: boolean }> = (props) => {
    let expandedTask;
    if (props.isActive) {
        expandedTask = (
            <div className={classes.expandable}>
                <textarea placeholder="Description" />
                <input type="date" />
                <input type="time" />
            </div>
        );
    }

    return (
        <form
            className={`${classes.task_form} ${
                props.isActive ? classes.active : null
            }`}
        >
            <input
                type="text"
                className={classes.title}
                defaultValue={props.title}
            />
            {props.isActive && expandedTask}
        </form>
    );
};

export default TaskForm;
