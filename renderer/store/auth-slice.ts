import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    authenticated: boolean;
    authErrorMsg: string;
    profileImg: string;
} = {
    authenticated: false,
    authErrorMsg: '',
    profileImg: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        isAuthenticated(state, action: PayloadAction<boolean>) {
            state.authenticated = action.payload;
        },
        updateAuthErrorMsg(state, action: PayloadAction<string>) {
            state.authErrorMsg = action.payload;
        },
        updateProfileImg(state, action: PayloadAction<string>) {
            state.profileImg = action.payload;
        }
        // login(state) {},
        // logout(state) {},
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
