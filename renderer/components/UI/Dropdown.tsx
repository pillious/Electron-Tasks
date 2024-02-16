import { useEffect, useRef, useState } from 'react';
import classes from './Dropdown.module.css';

interface IProps {
    toggleElem: React.ReactNode;
    items: {
        text: string;
        clickHandler: () => void;
    }[];
}

const Dropdown: React.FC<IProps> = (props) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleHandler = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className={classes.dropdown_wrapper}>
            <button onClick={toggleHandler} className={classes.toggle} data-is-open={open}>
                {props.toggleElem}
            </button>
            <div className={classes.dropdown} data-is-open={open} ref={dropdownRef}>
                <ul className={classes.list}>
                    {props.items.map((item, idx) => (
                        <li className={classes.item} key={idx}>
                            <button
                                onClick={() => {
                                    item.clickHandler();
                                    setOpen(false);
                                }}
                            >
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
