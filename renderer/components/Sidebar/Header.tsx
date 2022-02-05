import NewListButton from "../UI/NewListButton";
import classes from "./Header.module.css";

const Header: React.FC<{ openModal: () => void | null}> = (props) => {
    return (
        <div className={classes.header}>
            <p>My Lists</p>
            <NewListButton
                btnStyles={{
                    height: 25,
                    width: 25,
                    fontSize: 14,
                    borderRadius: "100%",
                }}
                onClick={props.openModal}
            >
                +
            </NewListButton>
        </div>
    );
};

export default Header;
