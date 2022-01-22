import { Fragment } from 'react';
import classes from './TaskList.module.css';

const TaskList: React.FC<{id: string, title: string}> = (props) => {
    return (
        <Fragment>
            <button className={classes.list_nav_btn}>
                <div>{props.title}</div>
            </button>
        </Fragment>
    );
};

export default TaskList;
