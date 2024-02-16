// The existing TokenClient type is missing the callback property.
type GoogleTokenClientWithCallback = google.accounts.oauth2.TokenClient & {
    callback: (resp: any) => void;
};

var tokenClient: google.accounts.oauth2.TokenClient;
// var tokenClient;
const SCOPE = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile';
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

// Loads the gapi client, initializes the client, then loads the google tasks api.
export const initClient = async () => {
    // First, load and initialize the gapi.client
    await new Promise<void>((resolve, reject) => {
        // NOTE: the 'auth2' module is no longer loaded.
        gapi.load('client', resolve);
    });

    await gapi.client
        .init({
            // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
        })
        .then(function () {
            // Load the Task API discovery document.
            gapi.client.load(DISCOVERY_URL);
        });

    console.log(gapi);
};

// Load the Google Identity Service client.
export const loadGisClient = async () => {
    await new Promise<void>((resolve, reject) => {
        try {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                scope: SCOPE,
                prompt: 'consent',
                callback: (tokResp) => console.log(tokResp), // defined at request time in await/promise scope.
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });

    console.log(tokenClient);
}


// Re-issue an access token to the user.
// If the error is not access token related, propagate the error.
export const getToken = async () => {
    // The access token is missing, invalid, or expired, prompt for user consent to obtain one.
    await new Promise((resolve, reject) => {
        try {
            // Settle this promise in the response callback for requestAccessToken()
            console.log(tokenClient);
            (tokenClient as GoogleTokenClientWithCallback).callback = (resp) => {
                if (resp.error !== undefined) {
                    reject(resp);
                }
                // GIS has automatically updated gapi.client with the newly issued access token.
                console.log(
                    'gapi.client access token: ' + JSON.stringify(gapi.auth.getToken())
                );
                resolve(resp);
            };
            tokenClient.requestAccessToken();
        } catch (err) {
            console.log(err);
        }
    });
    // if (
    //     err.result.error.code == 401 ||
    //     (err.result.error.code == 403 && err.result.error.status == 'PERMISSION_DENIED')
    // ) {
    //     // The access token is missing, invalid, or expired, prompt for user consent to obtain one.
    //     await new Promise((resolve, reject) => {
    //         try {
    //             // Settle this promise in the response callback for requestAccessToken()
    //             tokenClient.callback = (resp) => {
    //                 if (resp.error !== undefined) {
    //                     reject(resp);
    //                 }
    //                 // GIS has automatically updated gapi.client with the newly issued access token.
    //                 console.log(
    //                     'gapi.client access token: ' + JSON.stringify(gapi.auth.getToken())
    //                 );
    //                 resolve(resp);
    //             };
    //             tokenClient.requestAccessToken();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });
    // } else {
    //     // Errors unrelated to authorization: server errors, exceeding quota, bad requests, and so on.
    //     throw new Error(err);
    // }
};

// Check if access token is valid by checking expiration time is > 0 seconds.
export const hasValidToken = (): boolean => {
    const tok = gapi.client.getToken();
    if (tok === null || 'error' in tok) {
        return false;
    }

    // @ts-ignore The type for tok is incorrect. Error only exists if the token is invalid.
    return parseInt(tok.expires_in) > 0;
};

// Equiv. to logging out. Invalidates the current access token.
export const revokeToken = () => {
    let cred = gapi.client.getToken();
    if (cred !== null && hasValidToken()) {
        google.accounts.oauth2.revoke(cred.access_token, () => {
            console.log('Revoked: ' + cred.access_token);
        });
        gapi.client.setToken(null);
    }
}