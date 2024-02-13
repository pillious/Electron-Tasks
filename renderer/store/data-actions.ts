import { getToken, hasValidToken } from '../helpers/auth';
import { AppDispatch } from '../store/index';
import { dataActions } from './data-slice';

/***
 * Action Creators
 */

export const getAllLists = () => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!hasValidToken()) {
                await getToken();
            }

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
        if (!hasValidToken()) {
            await getToken();
        }

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
            if (!hasValidToken()) {
                await getToken();
            }

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
            console.log('Create new list failed.');
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
            if (!hasValidToken()) {
                await getToken();
            }

            if (!listId || !title) throw new Error('listId & title must be specified.');

            const task = {
                title: title,
                ...(description && { notes: description }),
                ...(date && { due: date }),
            };

            let resp: gapi.client.Response<gapi.client.tasks.Task>;
            if (isNewTask) {
                // Creates a new task
                resp = await gapi.client.tasks.tasks.insert({
                    tasklist: listId,
                    resource: task,
                });
                dispatch(dataActions.addTask(resp.result));
            } else {
                /**
                 * Updates existing task
                 * Issue: if we use update(), the Etag of the taskList doesn't get updated, so we get stale data.
                 * Issue link: https://issuetracker.google.com/issues/136123247
                 * Workaround: delete old version of the task, then insert a new task with the new version of the task.
                 */
                task["id"] = taskId; // update requires an id in the resource.
                console.log(task);
                console.log(listId);
                console.log(taskId);
                let x = await gapi.client.tasks.tasks.delete({
                    tasklist: listId,
                    task: taskId,
                });
                console.log(x);
                resp = await gapi.client.tasks.tasks.insert({
                    tasklist: listId,
                    resource: task,
                });
                console.log(resp);
                // Ideally, we could just update (doesn't work)
                // resp = await gapi.client.tasks.tasks.update({
                //     task: taskId,
                //     tasklist: listId,
                //     resource: task
                // })
                dispatch(
                    dataActions.updateTask({
                        taskId: taskId,
                        task: resp.result,
                    })
                );
            }
        } catch (err) {
            console.log('Create/Update task failed');
            console.log(err);
        }
    };
};
