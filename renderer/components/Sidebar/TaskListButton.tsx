import { Fragment } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { dataActions } from '../../store/data-slice';
import { getListTasks } from '../../store/data-actions';
import classes from './TaskListButton.module.css';

const TaskList: React.FC<{ id: string; title: string; active: boolean }> = (
    props
) => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(dataActions.setActiveList(props.id));
        dispatch(getListTasks(props.id));
    };

    let taskListBtn;
    if (props.active) {
        taskListBtn = (
            <div className={classes.active}>
                <p>{props.title}</p>
            </div>
        );
    } else {
        taskListBtn = (
            <button className={classes.list_nav_btn} onClick={clickHandler}>
                <div>{props.title}</div>
            </button>
        );
    }

    return <Fragment>{taskListBtn}</Fragment>;
};

export default TaskList;
