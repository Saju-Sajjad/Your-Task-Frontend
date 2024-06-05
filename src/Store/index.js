// Store/index.js

import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLogin: localStorage.getItem('isLogin') === 'true' // Initialize from localStorage
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem('isLogin', 'true'); // Persist login state
    },
    logout(state) {
      state.isLogin = false;
      localStorage.setItem('isLogin', 'false'); // Clear login state
    }
  }
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer
});
