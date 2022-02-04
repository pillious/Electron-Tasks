import classes from "./Checkbox.module.css";

const Checkbox: React.FC = () => {
    return (
        <label className={classes.container}>
            <input type="checkbox" className={classes.input} />
            <span className={classes.checkmark} />
        </label>
    );
};

export default Checkbox;
