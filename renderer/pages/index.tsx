import { Fragment, useEffect } from 'react';
import Main from '../components/Main/Main';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { authenticate } from '../store/auth-actions';
import { getAllLists } from '../store/data-actions';
import classes from './index.module.css';

const IndexPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
    console.log("loaded")
    // Authenticate user on load.
    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    // Get user's Google Task lists once authenticated.
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllLists());
        }
    }, [isAuthenticated, dispatch]);

    // Reduce http calls during dev.
    // useEffect(() => {
    //     dispatch(getAllLists());
    // }, [dispatch]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.sidebar_wrapper}>
                <Sidebar />
            </div>
            <div className={classes.main_wrapper}>
                <Main />
            </div>
        </div>
    );
};

export default IndexPage;
