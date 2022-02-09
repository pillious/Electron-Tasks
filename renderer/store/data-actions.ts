import { AppDispatch } from "../store/index";
import { dataActions } from "./data-slice";

/***
 * Action Creators
 */

export const getAllLists = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const resp = await gapi.client.tasks.tasklists.list();
            let taskLists: gapi.client.tasks.TaskList[] = resp.result.items;

            if (taskLists && taskLists.length > 0) {
                dispatch(dataActions.replaceAllLists(taskLists));
                // Set the default active list to the first task list.
                dispatch(dataActions.setActiveList(taskLists[0].id));
                // Get the tasks of the default active list.
                dispatch(getListTasks(taskLists[0].id));
            }
        } catch (error: any) {
            console.log(error);
        }
    };
};

/**
 *
 * @param id A task list id.
 */
export const getListTasks = (id: string) => {
    return async (dispatch: AppDispatch) => {
        const resp = await gapi.client.tasks.tasks.list({ tasklist: id });
        const tasks: gapi.client.tasks.Task[] = resp.result.items;

        console.log(resp);

        if (tasks && tasks.length > 0) {
            dispatch(dataActions.replaceAllActiveTasks(tasks));
        } else {
            dispatch(dataActions.replaceAllActiveTasks([]));
        }
    };
};

export const createList = (title: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            // Creates the new list.
            const resp = await gapi.client.tasks.tasklists.insert({
                resource: { title: title },
            });
            // Add the list to the global store.
            dispatch(dataActions.addList(resp.result));
            // Set the newly created list as the active list.
            dispatch(dataActions.setActiveList(resp.result.id));
            // Empty the current list of tasks.
            dispatch(dataActions.replaceAllActiveTasks([]));
        } catch (err) {
            console.log("Create new list failed.");
            console.log(err);
        }
    };
};

/***
 * Date must be in RFC 3339 timestamp. (use .toISOString())
 * Google API doesn't accept a time, only date.
 */
export const createTask = (
    listId: string,
    title: string,
    description?: string,
    date?: string
) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!listId || !title)
                throw new Error("listId & title must be specified.");

            const resp = await gapi.client.tasks.tasks.insert({
                tasklist: listId,
                resource: {
                    title: title,
                    ...(description && { notes: description }),
                    ...(date && { due: date }),
                },
            });
            dispatch(dataActions.addTask(resp.result));
        } catch (err) {
            console.log("Create new task failed");
            console.log(err);
        }
    };
};
