import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    taskLists: gapi.client.tasks.TaskList[];
    activeListId: string | null;
    activeTasks: gapi.client.tasks.Task[];
    isLoading: boolean;
    errorMsg: string | null;
} = {
    taskLists: [],
    activeListId: null,
    activeTasks: [],
    isLoading: false,
    errorMsg: null,
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        replaceAllLists(
            state,
            action: PayloadAction<gapi.client.tasks.TaskList[]>
        ) {
            state.taskLists = action.payload;
        },
        addList(state, action: PayloadAction<gapi.client.tasks.TaskList>) {
            state.taskLists.push(action.payload);
        },
        deleteList(state, action: PayloadAction<string>) {
            const listToDeleteIdx = state.taskLists.findIndex(
                (list) => list.id === action.payload
            );
            listToDeleteIdx !== -1 &&
                state.taskLists.splice(listToDeleteIdx, 1); // .splice directly modifies the array & returns the removed list.
        },
        setActiveList(state, action: PayloadAction<string>) {
            state.activeListId = action.payload;
        },
        replaceAllActiveTasks(
            state,
            action: PayloadAction<gapi.client.tasks.Task[]>
        ) {
            state.activeTasks = action.payload;
        },
        addTask(state, action: PayloadAction<gapi.client.tasks.Task>) {
            state.activeTasks.push(action.payload);
        },
        updateTask(
            state,
            action: PayloadAction<{
                taskId: string;
                task: gapi.client.tasks.Task;
            }>
        ) {
            let oldTaskIdx = state.activeTasks.findIndex(
                (task) => action.payload.taskId === task.id
            );
            if (oldTaskIdx >= 0) {
                state.activeTasks.splice(oldTaskIdx, 1);
                state.activeTasks.push(action.payload.task);
            }
        },
        // deleteTask(state, action: PayloadAction<string>)
        updateIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        // changeListName(state, action: PayloadAction<{id: string, newName: string}>) {},
    },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
