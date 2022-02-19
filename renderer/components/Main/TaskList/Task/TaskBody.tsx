import { Fragment, useEffect, useRef, useState } from "react";
import Modal from "../../../UI/Modal";
import NewTaskModalContent from "../NewTaskModalContent";
import classes from "./TaskBody.module.css";

const TaskBody: React.FC<{
    listId: string;
    taskId: string;
    title: string;
    description: string | null;
    due: Date | null;
}> = (props) => {
    const modalRef = useRef(null);

    const [openModal, setOpenModal] = useState(null);
    const [closeModal, setCloseModal] = useState(null);

    useEffect(() => {
        setOpenModal(() => modalRef.current.open);
        setCloseModal(() => modalRef.current.close);
    }, [modalRef])

    return (
        <Fragment>
            <Modal ref={modalRef} width={400} title="Add Task">
                <NewTaskModalContent
                    inputValues={{
                        title: props.title,
                        ...(props.description && {
                            description: props.description,
                        }),
                        ...(props.due && { due: props.due }),
                    }}
                    closeModal={closeModal}
                    listId={props.listId}
                    taskId={props.taskId}
                    isNewTask={false}
                />
            </Modal>

            <div className={classes.wrapper} onClick={openModal}>
                <p className={classes.title}>{props.title}</p>
                {props.due && (
                    <p className={classes.due}>
                        {props.due.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "2-digit",
                            day: "2-digit",
                        })}
                    </p>
                )}
                {/* <p className={classes.due}>10/06/22, Repeat</p> */}
                {props.description && props.description.trim() !== "" && (
                    <p className={classes.description}>{props.description}</p>
                )}
            </div>
        </Fragment>
    );
};

export default TaskBody;
