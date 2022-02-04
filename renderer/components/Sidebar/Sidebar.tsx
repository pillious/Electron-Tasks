import { useRef, useState } from "react";
import Modal from "../UI/Modal";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Sidebar.module.css";
import TaskLists from "./TaskListButtonGroup";

const Sidebar: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const onModalOpen = () => {
        setShowModal(true);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    return (
        <aside className={classes.sidebar}>
            <Header openModal={modalRef.current.open} />
            <TaskLists />
            <Footer openModal={modalRef.current.open} />
            <Modal ref={modalRef} />
        </aside>
    );
};

export default Sidebar;
