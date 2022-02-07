import { useRef } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createList } from "../../store/data-actions";
import ModalButtonGroup from "../UI/ModalButtonGroup";
import classes from "./NewListModalContent.module.css";

const NewListModalContent: React.FC<{
    closeModal: () => {};
}> = (props) => {
    const dispatch = useAppDispatch();
    const titleInputRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        let title = titleInputRef.current.value;
        if (title) {
            dispatch(createList(title));
            title = "";
            props.closeModal();
        } else {
            console.log("TODO: New list title can't be empty.");
        }
    };

    return (
        <form className={classes.form_control} onSubmit={submitHandler}>
            <label htmlFor="name">List Name:</label>
            <input
                name="name"
                type="text"
                placeholder="Name"
                ref={titleInputRef}
            />
            <ModalButtonGroup onCancel={props.closeModal} />
        </form>
    );
};

export default NewListModalContent;
