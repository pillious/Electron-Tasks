import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { signOut } from "../../store/auth-actions";
import classes from "./Header.module.css";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
    const activeListTitle = useAppSelector((state) => {
        let title = "";

        if (state.auth.authenticated) {
            let activeListId = state.data.activeListId;
            let allLists = state.data.taskLists;
            let activeList = allLists.find((list) => list.id === activeListId);
            if (activeList !== undefined) {
                title = activeList.title;
            }
        }

        return title;
    });

    const clickHandler = () => {
        dispatch(signOut());
    };

    let profileImg = "";
    let btnStyles: {
        backgroundImage: string;
    };

    // if (isAuthenticated) {
    //     let profile = gapi.auth2
    //         .getAuthInstance()
    //         .currentUser.get()
    //         .getBasicProfile();
    //     profileImg = profile.getImageUrl();

    //     btnStyles = {
    //         backgroundImage: `url(${profileImg})`,
    //     };
    // }

    return (
        <section className={classes.header}>
            <p>{activeListTitle}</p>
            {/* TODO: add Sign out dropdown */}
            <button
                onClick={clickHandler}
                style={btnStyles}
                className={classes.profile_btn}
            />
        </section>
    );
};

export default Header;
