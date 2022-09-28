import { useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createTask } from "../../../store/data-actions";
import ModalButtonGroup from "../../UI/ModalButtonGroup";
import classes from "./NewTaskModalContent.module.css";

const NewTaskModalContent: React.FC<{
    closeModal: () => {};
    isNewTask: boolean;
    listId: string;
    taskId?: string;
    inputValues?: {
        title: string;
        description?: string;
        due?: Date;
    };
}> = (props) => {
    let defaultValues = {
        title: "",
        description: "",
        due: null,
    };
    if (!props.isNewTask && props.inputValues) {
        defaultValues = {
            ...defaultValues,
            ...(props.inputValues.title && { title: props.inputValues.title }),
            ...(props.inputValues.description && {
                description: props.inputValues.description,
            }),
            ...(props.inputValues.due && {
                due: props.inputValues.due.toLocaleDateString("en-CA"),
            }),
        };
    }

    const nameInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const dateInputRef = useRef(null);

    const dispatch = useAppDispatch();

    const submitHandler = (event) => {
        const isTaskEdited = () => {
            return (
                defaultValues.title != nameInputRef.current.value.trim() ||
                defaultValues.description !=
                    descriptionInputRef.current.value.trim() ||
                (!defaultValues.due &&
                    dateInputRef.current.value.trim() === "") ||
                defaultValues.due != dateInputRef.current.value
            );
        };

        event.preventDefault();
        if (
            nameInputRef.current &&
            nameInputRef.current.value &&
            isTaskEdited()
        ) {
            dispatch(
                createTask(
                    props.isNewTask,
                    props.listId,
                    nameInputRef.current.value,
                    descriptionInputRef.current.value,
                    dateInputRef.current.value
                        ? new Date(dateInputRef.current.value).toISOString()
                        : null,
                    props.taskId
                )
            );

            nameInputRef.current.value = "";
            descriptionInputRef.current.value = "";
            dateInputRef.current.value = "";
        } else {
            console.log("TODO: Dispatch create task failed.");
        }
        props.closeModal();
    };

    return (
        <form className={classes.form_control} onSubmit={submitHandler}>
            <label htmlFor="name">Task Name:</label>
            <input
                name="name"
                type="text"
                placeholder="Name"
                ref={nameInputRef}
                defaultValue={defaultValues.title}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                placeholder="Description"
                name="description"
                ref={descriptionInputRef}
                defaultValue={defaultValues.description}
            />

            <label htmlFor="due">Date:</label>
            <input
                type="date"
                name="due"
                ref={dateInputRef}
                defaultValue={defaultValues.due}
            />

            <ModalButtonGroup
                onCancel={props.closeModal}
                submitButtonLabel={props.isNewTask ? "Create" : "Update"}
            />
        </form>
    );
};

export default NewTaskModalContent;
