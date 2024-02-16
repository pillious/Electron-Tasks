import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { signOut } from '../../store/auth-actions';
import { deleteList } from '../../store/data-actions';
import Dropdown from '../UI/Dropdown';
import classes from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const profileImg = useAppSelector((state) => state.auth.profileImg);
    const activeListId = useAppSelector((state) => state.data.activeListId);
    const activeListTitle = useAppSelector((state) => {
        let title = '';

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

    return (
        <>
            <section className={classes.header}>
                <div className={classes.active_list}>
                    <p>{activeListTitle}</p>
                    <Dropdown
                        toggleElem={<span>x</span>}
                        items={[
                            { text: 'Rename List', clickHandler: () => {} },
                            {
                                text: 'Delete List',
                                clickHandler: () => {
                                    dispatch(deleteList(activeListId));
                                },
                            },
                        ]}
                    />
                </div>

                {/* TODO: add Sign out dropdown */}
                <button onClick={clickHandler} className={classes.profile_btn}>
                    <img src={profileImg} referrerPolicy='no-referrer' />
                </button>
            </section>
        </>
    );
};

export default Header;
