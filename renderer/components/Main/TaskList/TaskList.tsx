import { Fragment, useRef } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Modal from "../../UI/Modal";
import NewListButton from "../../UI/NewListButton";
import NewTaskModalContent from "./NewTaskModalContent";
import Task from "./Task/Task";
import classes from "./TaskList.module.css";

const TaskList: React.FC = () => {
    const tasks = useAppSelector((state) => state.data.activeTasks);
    const activeListId = useAppSelector((state) => state.data.activeListId);

    let listItems;
    if (tasks && tasks.length > 0) {
        listItems = (
            <Fragment>
                {tasks.map((item) => (
                    <Task
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.notes}
                    />
                ))}
            </Fragment>
        );
    }

    const btnStyles = {padding: "4px 12px", borderRadius: 8 };

    const modalRef = useRef(null);

    const openModal: () => {} = modalRef.current ? modalRef.current.open : null;
    const closeModal: () => {} = modalRef.current
        ? modalRef.current.close
        : null;

    return (
        <section className={classes.list_wrapper}>
            <div className={classes.btn_wrapper}>
                <NewListButton btnStyles={btnStyles} onClick={openModal}>
                    <span>Add Task</span>
                </NewListButton>
            </div>
            <ul className={classes.list}>{listItems}</ul>
            <Modal ref={modalRef} width={400} title="Add Task">
                <NewTaskModalContent
                    closeModal={closeModal}
                    listId={activeListId}
                />
            </Modal>
        </section>
    );
};

export default TaskList;
