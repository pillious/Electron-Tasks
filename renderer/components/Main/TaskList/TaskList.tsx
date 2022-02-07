import { Fragment, useRef } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Modal from "../../UI/Modal";
import ModalButtonGroup from "../../UI/ModalButtonGroup";
import NewListButton from "../../UI/NewListButton";
import Task from "./Task/Task";
import classes from "./TaskList.module.css";

const TaskList: React.FC = () => {
    const tasks = useAppSelector((state) => state.data.activeTasks);

    let listItems;
    if (tasks && tasks.length > 0) {
        listItems = (
            <Fragment>
                {tasks.map((item) => (
                    <Task key={item.id} id={item.id} title={item.title} />
                ))}
            </Fragment>
        );
    }

    const btnStyles = { height: 32, width: 100, fontSize: 16, borderRadius: 8 };

    const modalRef = useRef(null);

    const openModal: () => {} = modalRef.current ? modalRef.current.open : null;
    const closeModal: () => {} = modalRef.current
        ? modalRef.current.close
        : null;

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle add task form submut.
    }

    return (
        <section className={classes.list_wrapper}>
            <div className={classes.btn_wrapper}>
                <NewListButton btnStyles={btnStyles} onClick={openModal}>
                    <span>Add Task</span>
                </NewListButton>
            </div>
            <ul className={classes.list}>{listItems}</ul>
            <Modal ref={modalRef} width={400} title="Add Task">
                <form onSubmit={handleSubmit}>
                    {/* Add custom hook for inputs */}
                    <ModalButtonGroup onCancel={closeModal}/>
                </form>
            </Modal>
        </section>
    );
};

export default TaskList;
