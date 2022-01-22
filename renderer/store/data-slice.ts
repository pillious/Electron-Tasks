import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    taskLists: gapi.client.tasks.TaskList[];
} = {
    taskLists: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        replaceAllLists(state, action: PayloadAction<gapi.client.tasks.TaskList[]>) {
            state.taskLists = action.payload;
        },
        addList(state, action: PayloadAction<gapi.client.tasks.TaskList>) {
            state.taskLists.push(action.payload);
        },
        deleteList(state, action: PayloadAction<string>) {
            const listToDeleteIdx = state.taskLists.findIndex(
                (list) => list.id === action.payload
            );
            listToDeleteIdx !== -1 && state.taskLists.splice(listToDeleteIdx, 1); // .splice directly modifies the array & returns the removed list.
        },
        // changeListName(state, action: PayloadAction<{id: string, newName: string}>) {},
    },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
