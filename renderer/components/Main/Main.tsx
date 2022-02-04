import Header from './Header';
import TaskList from './TaskList/TaskList';

const Main: React.FC = () => {
    return (
        <main>
            <Header />
            <TaskList />
        </main>
    );
};

export default Main;
