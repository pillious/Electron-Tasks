import { getToken, hasValidToken } from './auth';

const gTasksRequest = async <T,>(gtasksApiMethod: () => T): Promise<T> => {
    if (!hasValidToken()) {
        await getToken();
    }

    try {
        return gtasksApiMethod();
    } catch (err) {
        if (
            err.result.error.code == 401 ||
            (err.result.error.code == 403 && err.result.error.status == 'PERMISSION_DENIED')
        ) {
            await getToken();
            return await gtasksApiMethod();
        } else {
            throw new Error(err);
        }
    }
};

/*
 * Tasklist operations
 */

export const getTasklists = async () => {
    return await gTasksRequest(gapi.client.tasks.tasklists.list);
};

export const createList = async (
    options: Parameters<typeof gapi.client.tasks.tasklists.insert>[0] & {
        resource: gapi.client.tasks.TaskList;
    }
) => {
    return await gTasksRequest(() => gapi.client.tasks.tasklists.insert(options));
};

export const updateList = async (
    options: Parameters<typeof gapi.client.tasks.tasklists.patch>[0] & {
        resource: gapi.client.tasks.TaskList;
    }
) => {
    return await gTasksRequest(() => gapi.client.tasks.tasklists.patch(options));
};

/*
 * Task operations
 */
export const getTasksInList = async (
    options: Parameters<typeof gapi.client.tasks.tasks.list>[0]
) => {
    return await gTasksRequest(() => gapi.client.tasks.tasks.list(options));
};

export const createTask = async (
    options: Parameters<typeof gapi.client.tasks.tasks.insert>[0] & {
        resource: gapi.client.tasks.Task;
    }
) => {
    return await gTasksRequest(() => gapi.client.tasks.tasks.insert(options));
};

export const updateTask = async (
    options: Parameters<typeof gapi.client.tasks.tasks.patch>[0] & {
        resource: gapi.client.tasks.Task;
    }
) => {
    return await gTasksRequest(() => gapi.client.tasks.tasks.patch(options));
};

export const deleteTask = async (options: Parameters<typeof gapi.client.tasks.tasks.delete>[0]) => {
    return await gTasksRequest(() => gapi.client.tasks.tasks.delete(options));
};
