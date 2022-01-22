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
            // let resp = await gapi.client.tasks.tasklists.list();
            let resp = data;
            let taskLists = resp.result.items;

            if (taskLists && taskLists.length > 0) {
                let lists: gapi.client.tasks.TaskList[] = [];
                for (const list of taskLists) {
                    lists.push(list);
                }

                console.log(lists);

                dispatch(dataActions.replaceAllLists(lists));
            }
        } catch (error: any) {
            console.log(error);
        }
    };
};
