import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
    Fragment,
} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type Ref = {
    open: () => void;
    close: () => void;
};

type Props = {
    children?: React.ReactNode;
    title: string;
    height?: number | string;
    width?: number | string;
};

const Modal = forwardRef<Ref, Props>((props, ref) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }),
        []
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

    const modalStyles = {
        height: props.height ? props.height : "",
        width: props.width ? props.width : "",
    };

    let content = isOpen && (
        <div className={classes.wrapper}>
            <div className={classes.overlay} onClick={() => setIsOpen(false)} />
            <aside className={classes.modal} style={modalStyles}>
                <header className={classes.title}>{props.title}</header>
                {props.children}
            </aside>
        </div>
    );

    if (isBrowser) {
        return ReactDOM.createPortal(
            content,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
});

export default Modal;
