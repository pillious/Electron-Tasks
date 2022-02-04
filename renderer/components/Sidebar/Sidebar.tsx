import NewListButton from "../UI/NewListButton";
import Header from "./Header";
import classes from "./Sidebar.module.css";
import TaskLists from "./TaskListButtonGroup";

const Sidebar: React.FC = () => {
    return (
        <aside className={classes.sidebar}>
            <Header />
            <TaskLists />
            <div className={classes.btn_wrapper}>
                <NewListButton
                    btnStyles={{
                        height: 38,
                        width: 196,
                        borderRadius: 6,
                        fontSize: 20,
                        backgroundColor: "#2b96d9",
                        color: "#fff",
                    }}
                >
                    <span>Create New List</span>
                </NewListButton>
            </div>
        </aside>
    );
};

export default Sidebar;
