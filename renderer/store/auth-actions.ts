import { getToken, hasValidToken, initClient, loadGisClient, revokeToken } from '../helpers/auth';
import * as gdata from '../helpers/gdata';
import { AppDispatch } from '../store/index';
import { authActions } from './auth-slice';

/***
 * Action Creators
 */

// Returns a function so that we gain access to useAppDispatch() (useDispatch()) & allow us to run async code.
// Initializes the gapi.client & gapi.auth2 objects.
export const authenticate = () => {
    return async (dispatch: AppDispatch) => {
        // Initalizes the google auth2 client.
        try {
            await initClient();
            await loadGisClient();

            if (!hasValidToken()) {
                console.log('Invalid token. Generating a new token...');
                await getToken();
                console.log(gapi.client.getToken());
            } else {
                console.log('Valid token!');
                console.log(gapi.client.getToken());
            }

            dispatch(authActions.isAuthenticated(hasValidToken()));
            if (!hasValidToken) {
                throw new Error('Still invalid token after retry.');
            }

            // gapi.client.tasks.tasklists.list()
            //     .then((resp) => console.log(resp))
            //     .catch(err => getToken(err))
            //     .then(retry => gapi.client.tasks.tasklists.list())
            //     .then(calendarAPIResponse => console.log(JSON.stringify(calendarAPIResponse)))
            //     .catch(err  => console.log(err));
        } catch (err: any) {
            console.error(err);
            dispatch(authActions.isAuthenticated(false));
            dispatch(authActions.updateAuthErrorMsg('Something went wrong! :('));
        }
    };
};

export const signIn = async () => {
    authenticate();
};

export const signOut = () => {
    return (dispatch: AppDispatch) => {
        try {
            revokeToken();
            dispatch(authActions.isAuthenticated(false));
            dispatch(authActions.updateProfileImg(''));
        } catch (err) {
            console.log(err);
        }
    };
};

export const getProfilePicture = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const url = await gdata.getProfilePicture();
            dispatch(authActions.updateProfileImg(url));
        } catch (err) {
            console.error(err);
        }
    };
};
