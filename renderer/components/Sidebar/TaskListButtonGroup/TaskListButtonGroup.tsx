import { Fragment } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import TaskList from './TaskListButton';
import classes from './TaskListButtonGroup.module.css';

const TaskLists: React.FC = () => {
    const taskLists = useAppSelector((state) => state.data.taskLists);
    const activeListId = useAppSelector((state) => state.data.activeListId);

    let content = <p>No Lists Yet.</p>;
    if (taskLists && taskLists.length > 0) {
        content = (
            <Fragment>
                {taskLists.map((list) => (
                    <TaskList
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        active={list.id === activeListId}
                    />
                ))}
            </Fragment>
        );
    }

    return <div className={classes.lists_nav}>{content}</div>;
};

export default TaskLists;
