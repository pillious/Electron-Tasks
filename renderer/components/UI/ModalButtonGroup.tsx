import classes from "./ModalButtonGroup.module.css";

const ModalButtonGroup: React.FC<{onCancel: () => void}> = (props) => {
    return (
        <div className={classes.btn_group}>
            <button type="button" onClick={props.onCancel}>
                Cancel
            </button>
            <button type="submit">Create</button>
        </div>
    );
};

export default ModalButtonGroup;
