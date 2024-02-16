import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { createList, updateList } from '../../store/data-actions';
import ModalButtonGroup from '../UI/ModalButtonGroup';
import classes from './NewListModalContent.module.css';

const RenameListModalContent: React.FC<{
    closeModal: () => {};
}> = (props) => {
    const activeListId = useAppSelector((state) => state.data.activeListId);
    const title = useAppSelector((state) => {
        let title = '';
        if (state.auth.authenticated) {
            let activeListId = state.data.activeListId;
            let allLists = state.data.taskLists;
            let activeList = allLists.find((list) => list.id === activeListId);
            if (activeList !== undefined) {
                title = activeList.title;
            }
        }
        return title;
    });

    const dispatch = useAppDispatch();
    const titleInputRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        let title = titleInputRef.current.value;
        if (title) {
            dispatch(updateList(activeListId, title));
            props.closeModal();
        } else {
            console.log("TODO: New list title can't be empty.");
        }
    };

    return (
        <form className={classes.form_control} onSubmit={submitHandler}>
            <label htmlFor='name'>List Name:</label>
            <input
                name='name'
                type='text'
                placeholder='Name'
                ref={titleInputRef}
                defaultValue={title}
            />
            <ModalButtonGroup onCancel={props.closeModal} submitButtonLabel='Save' />
        </form>
    );
};

export default RenameListModalContent;
