import classes from "./Task.module.css";
import TaskBody from "./TaskBody";
import Checkbox from "./Checkbox";

const Task: React.FC<{
    id: string;
    title: string;
    description: string | null;
    due: Date | null;
}> = (props) => {
    return (
        <li className={classes.listitem} >
            <Checkbox />
            <TaskBody
                id={props.id}
                title={props.title}
                description={props.description}
                due={props.due}
            />
        </li>
    );
};

export default Task;
