// TODO: Move scope, discovery_url , apikey, client id to env file.
const SCOPE = 'https://www.googleapis.com/auth/tasks';
const DISCOVERY_URL =
    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

export const initClient = async () => {
    try {
        await new Promise((resolve) => gapi.load('client:auth2', resolve));
        await new Promise((resolve) => {
            const GAPI_AUTH_BODY = {
                apiKey: process.env.NEXT_PUBLIC_API_KEY,
                clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                scope: SCOPE,
                discoveryDocs: [DISCOVERY_URL],
            };
            gapi.client.init(GAPI_AUTH_BODY).then(resolve, (err) => {
                console.log(err);
            });
        });
    } catch (err: any) {
        let msg = 'Something went wrong! :(';
        if ('error' in err) {
            msg = err.error;
        }
        throw new Error(msg);
    }
};
