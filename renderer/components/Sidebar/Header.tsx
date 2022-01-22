import classes from './Header.module.css';

const Header: React.FC = () => {
    return (
        <div className={classes.header}>
            <p>My Lists</p>
            <button className={classes.new_list_btn}>+</button>
        </div>
    );
};

export default Header;
