import classes from "./TaskBody.module.css";

const TaskBody: React.FC<{ title: string; description: string }> = (props) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.title}>{props.title}</p>
            <p className={classes.description}>{props.description}</p>
            <p className={classes.due}>10/06/22, Repeat</p>
        </div>
    );
};

export default TaskBody;
