import Header from './Header';
import classes from './Sidebar.module.css';
import TaskLists from './TaskLists';

const Sidebar: React.FC = () => {
    return (
        <aside className={classes.sidebar}>
            <Header />
            <TaskLists />
        </aside>
    );
};

export default Sidebar;
