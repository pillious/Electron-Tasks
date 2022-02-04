import NewListButton from "../UI/NewListButton";
import classes from "./Header.module.css";

const Header: React.FC = () => {
    const handleClick = () => {};

    return (
        <div className={classes.header}>
            <p>My Lists</p>
            <NewListButton btnStyles={{height: 25, width: 25, fontSize: 14, borderRadius: '100%'}}>
                +
            </NewListButton>
            {/* // <button className={classes.new_list_btn} onClick={handleClick}>+</button> */}
        </div>
    );
};

export default Header;
