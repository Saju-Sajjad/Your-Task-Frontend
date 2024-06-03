// Store/index.js

import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: { isLogin: false },
    reducers: {
        login(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        }
    }
});

export const { login, logout } = authSlice.actions; // Export authActions here

export const store = configureStore({
    reducer: authSlice.reducer
});
