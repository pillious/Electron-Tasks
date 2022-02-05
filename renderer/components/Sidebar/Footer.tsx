import NewListButton from "../UI/NewListButton";
import classes from './Footer.module.css';

const Footer: React.FC<{openModal: () => void | null}> = (props) => {
    return (
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
                onClick={props.openModal}
            >
                <span>Create New List</span>
            </NewListButton>
        </div>
    );
};

export default Footer;
