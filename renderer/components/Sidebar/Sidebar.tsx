import { useRef } from "react";
import Modal from "../UI/Modal";
import Footer from "./Footer";
import Header from "./Header";
import NewListModalContent from "./NewListModalContent";
import classes from "./Sidebar.module.css";
import TaskLists from "./TaskListButtonGroup/TaskListButtonGroup";

const Sidebar: React.FC = () => {
    const modalRef = useRef(null);

    const openModal: () => {} = modalRef.current ? modalRef.current.open : null;
    const closeModal: () => {} = modalRef.current
        ? modalRef.current.close
        : null;

    return (
        <aside className={classes.sidebar}>
            <Header openModal={openModal} />
            <TaskLists />
            <Footer openModal={openModal} />
            <Modal ref={modalRef} width={300} title="Create List">
                <NewListModalContent closeModal={closeModal} />
            </Modal>
        </aside>
    );
};

export default Sidebar;
