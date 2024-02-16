import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    authenticated: boolean;
    authErrorMsg: string;
    profileImg: string;
    isGapiLoaded: boolean;
} = {
    authenticated: false,
    authErrorMsg: '',
    profileImg: '',
    isGapiLoaded: false,
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
        },
        updateGapiLoaded(state, action: PayloadAction<boolean>) {
            state.isGapiLoaded = action.payload;
        },
        // login(state) {},
        // logout(state) {},
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
