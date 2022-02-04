import { AppDispatch } from '../store/index';
import { dataActions } from './data-slice';

// TEMP DATA
import { data } from '../data';

/***
 * Action Creators
 */

export const getAllLists = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const resp = await gapi.client.tasks.tasklists.list();
            // const resp = data;
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
        const resp = await gapi.client.tasks.tasks.list({tasklist: id});
        const tasks: gapi.client.tasks.Task[] = resp.result.items;
        
        console.log(resp);
        
        if (tasks && tasks.length > 0) {
            dispatch(dataActions.replaceAllActiveTasks(tasks));
        }
        else {
            dispatch(dataActions.replaceAllActiveTasks([]));
        }
    }
}
