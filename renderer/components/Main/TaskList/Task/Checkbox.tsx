import { delay } from '../../../../helpers/utils';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { updateTask } from '../../../../store/data-actions';
import { dataActions } from '../../../../store/data-slice';
import classes from './Checkbox.module.css';

interface IProps {
    listId: string;
    taskId: string;
}

const Checkbox: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();

    const handleCheckboxChange = async (event) => {
        if (!event.target.checked) return;

        dispatch(
            updateTask(props.listId, props.taskId, {
                completed: new Date().toISOString(),
                status: 'completed',
            })
        );
        await delay(250);
        dispatch(dataActions.removeTask(props.taskId));
    };

    return (
        <label className={classes.container}>
            <input type='checkbox' className={classes.input} onChange={handleCheckboxChange} />
            <span className={classes.checkmark} />
        </label>
    );
};

export default Checkbox;
