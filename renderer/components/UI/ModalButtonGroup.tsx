import classes from "./ModalButtonGroup.module.css";

const ModalButtonGroup: React.FC<{
    onCancel: () => void;
    submitButtonLabel?: string;
}> = (props) => {
    return (
        <div className={classes.btn_group}>
            <button type="button" onClick={props.onCancel}>
                Cancel
            </button>
            <button type="submit">
                {props.submitButtonLabel ? props.submitButtonLabel : "Create"}
            </button>
        </div>
    );
};

export default ModalButtonGroup;
