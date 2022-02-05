import { MutableRefObject, useRef } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createList } from "../../store/data-actions";
import classes from "./NewListModalContent.module.css";

const NewListModalContent: React.FC<{
    closeModal: () => {};
}> = (props) => {
    const dispatch = useAppDispatch();
    const titleInputRef = useRef(null);

    // const openModal = props.modalRef.current
    //     ? props.modalRef.current.open
    //     : null;
    // const closeModal = props.modalRef.current
    //     ? props.modalRef.current.close
    //     : null;

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
            <div className={classes.btn_group}>
                <button type="button" onClick={props.closeModal}>
                    Cancel
                </button>
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default NewListModalContent;
