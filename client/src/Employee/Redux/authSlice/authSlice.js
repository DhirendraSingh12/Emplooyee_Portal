import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    name: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('Login successful: ', action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      console.log('Logout successful');
      state.isAuthenticated = false;
      state.user = { name: '' };
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
