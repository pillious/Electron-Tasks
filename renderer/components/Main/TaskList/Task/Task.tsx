import classes from "./Task.module.css";
import TaskBody from "./TaskBody";
import Checkbox from "./Checkbox";

const Task: React.FC<{
    listId: string;
    taskId: string;
    title: string;
    description: string | null;
    due: Date | null;
}> = (props) => {
    return (
        <li className={classes.listitem} >
            <Checkbox />
            <TaskBody
                listId={props.listId}
                taskId={props.taskId}
                title={props.title}
                description={props.description}
                due={props.due}
            />
        </li>
    );
};

export default Task;
