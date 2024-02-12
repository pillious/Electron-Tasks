// Not used.
export default class User {
    // An array of TaskList objects
    static lists = [];

    static async listTaskLists() {
        let resp = await window.gapi.client.tasks.tasklists.list();
        let taskLists = resp.result.items;
        if (taskLists && taskLists.length > 0) {
            for (let i = 0; i < taskLists.length; i++) {
                User.lists.push(User.createTaskListObj(taskLists[i]));    
            }
            User.batchRequest();
        }
    }

    static async batchRequest() {
        const batch = window.gapi.client.newBatch();
        User.lists.forEach(list => {
            const req = window.gapi.client.tasks.tasks.list({'tasklist': list.id});
            batch.add(req, {'id': list.id});
        });
        await batch.execute(User.parseBatchRequest);
    }

    static parseBatchRequest(resp) {
        User.lists.forEach(list => {
            let tasks = resp[list.id].result.items;
            tasks.forEach(task => {
                list.addTask(task);
            });
        });
    }

    static createTaskListObj(taskList) {
        return new TaskList(taskList);
    }
}
