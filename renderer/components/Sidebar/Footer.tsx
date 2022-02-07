import NewListButton from "../UI/NewListButton";
import classes from './Footer.module.css';

const Footer: React.FC<{openModal: () => void | null}> = (props) => {
    return (
        <div className={classes.btn_wrapper}>
            <NewListButton
                btnStyles={{
                    height: 38,
                    padding: "0 clamp(0rem, 5vw, 5rem)",
                    borderRadius: 6,
                    fontSize: "1rem",
                    // fontSize: "clamp(1rem, 1.5vw , 1.125rem)",
                    backgroundColor: "#2b96d9",
                    color: "#fff",
                }}
                onClick={props.openModal}
            >
                <span>Create List</span>
            </NewListButton>
        </div>
    );
};

export default Footer;
