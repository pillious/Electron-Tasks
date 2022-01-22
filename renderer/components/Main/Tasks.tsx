import { Fragment } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';

const Tasks: React.FC = () => {
    const tasks = useAppSelector((state) => state.data.activeTasks);

    let listItems;
    if (tasks && tasks.length > 0) {
        listItems = <Fragment>{tasks.map(item => <li key={item.id}>item: {item.id}</li>)}</Fragment>
    }

    return (
        <section>
            <button>New Task</button>
            <ul>
                {listItems}
            </ul>
        </section>
    );
};

export default Tasks;
