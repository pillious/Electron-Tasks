import { Fragment } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getListTasks } from '../../store/data-actions';
import classes from './TaskList.module.css';

const TaskList: React.FC<{id: string, title: string}> = (props) => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(getListTasks(props.id));
    }

    return (
        <Fragment>
            <button className={classes.list_nav_btn} onClick={clickHandler}>
                <div>{props.title}</div>
            </button>
        </Fragment>
    );
};

export default TaskList;
