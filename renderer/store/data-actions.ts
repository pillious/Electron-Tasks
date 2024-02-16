import { getToken, hasValidToken } from '../helpers/auth';
import * as gtasks from '../helpers/gtasks';
import { AppDispatch } from '../store/index';
import { dataActions } from './data-slice';

/***
 * Action Creators
 */

export const getAllLists = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const taskLists = (await gtasks.getTasklists()).result.items;

            if (taskLists && taskLists.length > 0) {
                dispatch(dataActions.replaceAllLists(taskLists));
                dispatch(dataActions.setActiveList(taskLists[0].id)); // Set the default active list to the first task list.
                dispatch(getListTasks(taskLists[0].id)); // Get the tasks of the default active list.
            }
        } catch (error: any) {
            console.error(error);
        }
    };
};

/**
 *
 * @param id A task list id.
 */
export const getListTasks = (id: string) => {
    return async (dispatch: AppDispatch) => {
        const tasks = (await gtasks.getTasksInList({ tasklist: id })).result.items;

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
            const resp = (await gtasks.createList({ resource: { title: title } })).result;

            dispatch(dataActions.addList(resp)); // Add the list to the global store.
            dispatch(dataActions.setActiveList(resp.id)); // Set the newly created list as the active list.
            dispatch(dataActions.replaceAllActiveTasks([])); // Empty the current list of tasks.
        } catch (err) {
            console.log('Create new list failed.');
            console.error(err);
        }
    };
};

/***
 * Date must be in RFC 3339 timestamp. (use .toISOString())
 * Google API doesn't accept a time, only date.
 */
export const createTask = (tasklistId: string, task: gapi.client.tasks.Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!tasklistId || !task.title) throw new Error('listId & title must be specified.');

            const resp = (await gtasks.createTask({ tasklist: tasklistId, resource: task })).result;
            dispatch(dataActions.addTask(resp));
        } catch (err) {
            console.log('Create task failed');
            console.error(err);
        }
    };
};

/**
 * Updates existing task
 * Issue: if we use update(), the Etag of the taskList doesn't get updated, so we get stale data.
 * Issue link: https://issuetracker.google.com/issues/136123247
 * Workaround 1: delete old version of the task, then insert a new task with the new version of the task.
 * Workaround 2 (in use): it seems calling update on a tasklist w/o changing anything forces the etag to change.
 */
export const updateTask = (tasklistId: string, taskId: string, task: gapi.client.tasks.Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!tasklistId || !taskId) throw new Error('listId & taskId must be specified.');

            const resp = (
                await gtasks.updateTask({
                    tasklist: tasklistId,
                    task: taskId,
                    resource: { ...task, id: taskId },
                })
            ).result;

            // Force the tasklist's etag to change by updating the tasklist.
            await gtasks.updateList({ tasklist: tasklistId, resource: { id: tasklistId } });

            dispatch(dataActions.updateTask({ taskId: taskId, task: resp }));
        } catch (err) {
            console.log('Update task failed');
            console.error(err);
        }
    };
};

export const deleteTask = (tasklistId: string, taskId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!tasklistId || !taskId) throw new Error('listId & taskId must be specified.');

            await gtasks.deleteTask({ tasklist: tasklistId, task: taskId });
            dispatch(dataActions.removeTask(taskId));
        } catch (err) {
            console.log('Delete task failed');
            console.error(err);
        }
    };
};
