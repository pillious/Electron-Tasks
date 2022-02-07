import { useAppDispatch } from "../../../hooks/useAppDispatch";
import classes from "./NewTaskModalContent.module.css";

const NewTaskModalContent: React.FC<{
    closeModal: () => {};
}> = (props) => {
    const dispatch = useAppDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.form_control} onSubmit={submitHandler}>
            <label htmlFor="name">List Name:</label>
            <input name="name" type="text" placeholder="Name" />
            {/* <div className={classes.btn_group}>
                <button type="button" onClick={props.closeModal}>
                    Cancel
                </button>
                <button type="submit">Create</button>
            </div> */}
        </form>
    );
};

export default NewTaskModalContent;
