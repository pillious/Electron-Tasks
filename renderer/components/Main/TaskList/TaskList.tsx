import { Fragment, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Task from "./Task/Task";
import classes from './TaskList.module.css';

const TaskList: React.FC = () => {
    const tasks = useAppSelector((state) => state.data.activeTasks);

    let listItems;
    if (tasks && tasks.length > 0) {
        listItems = (
            <Fragment>
                {tasks.map((item) => (
                    <Task key={item.id} id={item.id} title={item.title} />
                ))}
            </Fragment>
        );
    }

    return (
        <section className={classes.list_wrapper}>
            <button className={classes.new_task_btn}>New Task</button>
            <ul className={classes.list}>{listItems}</ul>
        </section>
    );
};

export default TaskList;
