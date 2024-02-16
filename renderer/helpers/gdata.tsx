import { getToken, hasValidToken } from './auth';

// Wrapper for all operations below. Handles access token validation.
// If the API call fails due to invalid token, attempts to refresh token and retries the call once.
const gApiRequest = async <T,>(func: () => T): Promise<T> => {
    if (!hasValidToken()) {
        await getToken();
    }

    try {
        console.log("FJASKFDJASKDF")
        console.log("HELLOOOOOOO???")
        return func();
    } catch (err) {
        console.log(err);
        console.log('Retrying with new token');
        if (
            err.result.error.code == 401 ||
            (err.result.error.code == 403 && err.result.error.status == 'PERMISSION_DENIED')
        ) {
            await getToken();
            return await func();
        } else {
            throw new Error(err);
        }
    }
};

/*
 * Tasklist operations
 */
export const getTasklists = async () => {
    return await gApiRequest(gapi.client.tasks.tasklists.list);
};

export const createList = async (
    options: Parameters<typeof gapi.client.tasks.tasklists.insert>[0] & {
        resource: gapi.client.tasks.TaskList;
    }
) => {
    return await gApiRequest(() => gapi.client.tasks.tasklists.insert(options));
};

export const updateList = async (
    options: Parameters<typeof gapi.client.tasks.tasklists.patch>[0] & {
        resource: gapi.client.tasks.TaskList;
    }
) => {
    return await gApiRequest(() => gapi.client.tasks.tasklists.patch(options));
};

export const deleteList = async (
    options: Parameters<typeof gapi.client.tasks.tasklists.delete>[0]
) => {
    return await gApiRequest(() => gapi.client.tasks.tasklists.delete(options));
};

/*
 * Task operations
 */
export const getTasksInList = async (
    options: Parameters<typeof gapi.client.tasks.tasks.list>[0]
) => {
    return await gApiRequest(() => gapi.client.tasks.tasks.list(options));
};

export const createTask = async (
    options: Parameters<typeof gapi.client.tasks.tasks.insert>[0] & {
        resource: gapi.client.tasks.Task;
    }
) => {
    return await gApiRequest(() => gapi.client.tasks.tasks.insert(options));
};

export const updateTask = async (
    options: Parameters<typeof gapi.client.tasks.tasks.patch>[0] & {
        resource: gapi.client.tasks.Task;
    }
) => {
    return await gApiRequest(() => gapi.client.tasks.tasks.patch(options));
};

export const deleteTask = async (options: Parameters<typeof gapi.client.tasks.tasks.delete>[0]) => {
    return await gApiRequest(() => gapi.client.tasks.tasks.delete(options));
};

/*
 * Profile operations
 */
export const getProfilePicture = async () => {
    return await gApiRequest(async () => {
        const resp = await gapi.client.request({
            path: 'https://people.googleapis.com/v1/people/me?personFields=photos',
        });

        return resp.result.photos[0].url;
    });
};
