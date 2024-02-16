import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteTask } from '../../../../store/data-actions';
import Checkbox from "./Checkbox";
import classes from "./Task.module.css";
import TaskBody from "./TaskBody";

const Task: React.FC<{
    listId: string;
    taskId: string;
    title: string;
    description: string | null;
    due: Date | null;
}> = (props) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(props.listId, props.taskId));
    }

    return (
        <li className={classes.listitem}>
            <Checkbox />
            <TaskBody
                listId={props.listId}
                taskId={props.taskId}
                title={props.title}
                description={props.description}
                due={props.due}
            />
            <div className={classes.delete} onClick={handleDelete}>X</div>
        </li>
    );
};

export default Task;
