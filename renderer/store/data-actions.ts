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
        console.log(resp);
        const tasks: gapi.client.tasks.Task[] = resp.result.items;

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
    isNewTask: boolean,
    listId: string,
    title: string,
    description?: string,
    date?: string,
    taskId?: string
) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!listId || !title)
                throw new Error("listId & title must be specified.");

            let resp;
            if (isNewTask) {
                // Creates a new task
                resp = await gapi.client.tasks.tasks.insert({
                    tasklist: listId,
                    resource: {
                        title: title,
                        ...(description && { notes: description }),
                        ...(date && { due: date }),
                    },
                });
                dispatch(dataActions.addTask(resp.result));
            } else {
                /**
                 * Updates existing task
                 * Unable to update task directly. gapi doesn't return the update versions of the tasks.
                 * Must delete old version of task, then insert updated version of task.
                 */
                resp = await gapi.client.tasks.tasks.get({
                    tasklist: listId,
                    task: taskId,
                });
                let task = {
                    ...resp.result,
                    ...(title && { title: title }),
                    ...(description && { notes: description }),
                    ...(date && { due: date }),
                };
                await gapi.client.tasks.tasks.delete({
                    tasklist: listId,
                    task: taskId,
                });
                resp = await gapi.client.tasks.tasks.insert({
                    tasklist: listId,
                    resource: task,
                });
                dispatch(
                    dataActions.updateTask({
                        taskId: taskId,
                        task: resp.result,
                    })
                );
            }
        } catch (err) {
            console.log("Create/Update task failed");
            console.log(err);
        }
    };
};
