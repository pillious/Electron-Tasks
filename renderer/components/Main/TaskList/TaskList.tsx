import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import Modal from '../../UI/Modal';
import NewListButton from '../../UI/NewListButton';
import NewTaskModalContent from './NewTaskModalContent';
import Task from './Task/Task';
import classes from './TaskList.module.css';

const TaskList: React.FC = () => {
    const tasks = useAppSelector((state) => state.data.activeTasks);
    const activeListId = useAppSelector((state) => state.data.activeListId);

    let listItems: React.ReactNode[];
    if (tasks && tasks.length > 0) {
        const sortedTasks = [...tasks].sort(
            (first, second) => parseInt(first.position) - parseInt(second.position)
        );
        console.log(tasks);
        console.log(sortedTasks);

        listItems = sortedTasks.map((item) => (
            <Task
                key={item.id}
                listId={activeListId}
                taskId={item.id}
                title={item.title}
                description={item.notes ? item.notes : null}
                due={item.due ? new Date(item.due) : null}
            />
        ));
    }

    const btnStyles = { padding: '4px 12px', borderRadius: 8 };

    const modalRef = useRef(null);

    const [openModal, setOpenModal] = useState(null);
    const [closeModal, setCloseModal] = useState(null);

    useEffect(() => {
        setOpenModal(() => modalRef.current.open);
        setCloseModal(() => modalRef.current.close);
    }, [modalRef]);

    return (
        <section className={classes.list_wrapper}>
            <div className={classes.btn_wrapper}>
                <NewListButton btnStyles={btnStyles} onClick={openModal}>
                    <span>Add Task</span>
                </NewListButton>
            </div>
            {(!listItems || listItems.length == 0) && (
                <p className={classes.completed}>All tasks completed!</p>
            )}
            <ul className={classes.list}>{listItems}</ul>
            <Modal ref={modalRef} width={400} title='Add Task'>
                <NewTaskModalContent closeModal={closeModal} listId={activeListId} isNewTask />
            </Modal>
        </section>
    );
};

export default TaskList;
