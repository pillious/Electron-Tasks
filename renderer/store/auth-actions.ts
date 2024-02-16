import { getToken, hasValidToken, initClient, loadGisClient, loadTokenFromLocalStorage, revokeToken, saveTokenToLocalStorage } from '../helpers/auth';
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
            await initClient(() => dispatch(authActions.updateGapiLoaded(true)));
            await loadGisClient();
            
            const token = loadTokenFromLocalStorage();
            if (token !== null) {
                gapi.client.setToken(token);
            }

            if (!hasValidToken()) {
                console.log('Invalid token. Generating a new token...');
                await getToken();
                console.log(gapi.client.getToken());
            } else {
                console.log('Valid token!');
                console.log(gapi.client.getToken());
            }


            saveTokenToLocalStorage(gapi.client.getToken());
            dispatch(authActions.isAuthenticated(hasValidToken()));
            if (!hasValidToken) {
                throw new Error('Still invalid token after retry.');
            }
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
