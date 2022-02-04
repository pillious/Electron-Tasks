import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props, ref) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }),
        [close]
    );

    const handleEscape = (event) => {
        if (event.keyCode === 27) setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) document.addEventListener("keydown", handleEscape, false);
        return () => {
            document.removeEventListener("keydown", handleEscape, false);
        };
    }, [handleEscape, isOpen]);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    let modalContent = isOpen && (
        <div className={classes.overlay} onClick={() => setIsOpen(false)}>
            <div className={classes.modal}></div>
        </div>
    );

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

export default forwardRef(Modal);
