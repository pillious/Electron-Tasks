import { Fragment } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import NewListButton from "../../UI/NewListButton";
import Task from "./Task/Task";
import classes from "./TaskList.module.css";

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

    const btnStyles = { height: 32, width: 100, fontSize: 16, borderRadius: 8 };

    const clickHandler = () => {};

    return (
        <section className={classes.list_wrapper}>
            <div className={classes.btn_wrapper}>
                <NewListButton btnStyles={btnStyles} onClick={clickHandler}>
                    <span>Add Task</span>
                </NewListButton>
            </div>
            <ul className={classes.list}>{listItems}</ul>
        </section>
    );
};

export default TaskList;
