import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem("add-new-campaign-token"),
  token: localStorage.getItem("add-new-campaign-token") || null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("add-new-campaign-token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("add-new-campaign-token");
    },
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
