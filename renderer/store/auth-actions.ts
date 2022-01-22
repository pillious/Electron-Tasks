import { AppDispatch } from '../store/index';
import { authActions } from './auth-slice';
import { initClient } from '../helpers/auth';

/***
 * Action Creators
 */

// Returns a function so that we gain access to useAppDispatch() (useDispatch()) & allow us to run async code.
// Initializes the gapi.client & gapi.auth2 objects.
export const authenticate = () => {
    return async (dispatch: AppDispatch) => {
        // Initalizes the google auth2 client.
        try {
            // let GoogleAuth: gapi.auth2.GoogleAuth = await initClient();
            await initClient();
            const GoogleAuth: gapi.auth2.GoogleAuth = gapi.auth2.getAuthInstance();

            if (GoogleAuth) {
                // Attach a listner to listen for signed in state updates
                GoogleAuth.isSignedIn.listen((isSignedIn: boolean) =>
                    signinStatusListener(isSignedIn, dispatch)
                );

                const isSignedIn = GoogleAuth.isSignedIn.get();
                console.log(`isAuthenticated => ${isSignedIn}`);
                if (isSignedIn) {
                    // auto login succeeded.
                    dispatch(authActions.isAuthenticated(true));
                } else {
                    // auto login failed, attempt signin through popup
                    await signIn(dispatch);
                }
            } else {
                // Both auto login and signin failed (should never reach this point).
                throw new Error('Something went wrong! :(');
            }
        } catch (err: any) {
            dispatch(authActions.isAuthenticated(false));
            dispatch(
                authActions.updateAuthErrorMsg('Something went wrong! :(')
            );
        }
    };
};

// Sign in the user using the Google oAuth popup (permissions are accepted/denied in popup).
const signIn = async (dispatch: AppDispatch) => {
    const GoogleAuth: gapi.auth2.GoogleAuth =
        gapi.auth2.getAuthInstance();

    try {
        await GoogleAuth.signIn();
        dispatch(authActions.isAuthenticated(true));
    } catch (err: any) {
        throw new Error(err);
    }

};

// Updates redux store with the signed in state when state changes.
const signinStatusListener = (isSignedIn: boolean, dispatch: AppDispatch) => {
    console.log(`Signin status updated => ${isSignedIn}`)
    dispatch(authActions.isAuthenticated(isSignedIn));
};
