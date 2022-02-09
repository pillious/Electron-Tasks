import { useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createTask } from "../../../store/data-actions";
import ModalButtonGroup from "../../UI/ModalButtonGroup";
import classes from "./NewTaskModalContent.module.css";

const NewTaskModalContent: React.FC<{
    closeModal: () => {};
    listId: string;
}> = (props) => {
    const nameInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const dateInputRef = useRef(null);

    const dispatch = useAppDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        if (nameInputRef.current && nameInputRef.current.value) {
            dispatch(
                createTask(
                    props.listId,
                    nameInputRef.current.value,
                    descriptionInputRef.current.value,
                    dateInputRef.current.value
                        ? new Date(dateInputRef.current.value).toISOString()
                        : null
                )
            );

            nameInputRef.current.value = "";
            descriptionInputRef.current.value = "";
            dateInputRef.current.value = "";
            
            props.closeModal();
        } else {
            console.log("TODO: New task must have a title.");
        }
    };

    return (
        <form className={classes.form_control} onSubmit={submitHandler}>
            <label htmlFor="name">List Name:</label>
            <input
                name="name"
                type="text"
                placeholder="Name"
                ref={nameInputRef}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                placeholder="Description"
                name="description"
                ref={descriptionInputRef}
            />

            <label htmlFor="date">Date:</label>
            <input type="date" name="date" ref={dateInputRef} />

            <ModalButtonGroup onCancel={props.closeModal} />
        </form>
    );
};

export default NewTaskModalContent;
