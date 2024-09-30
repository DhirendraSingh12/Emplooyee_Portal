import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlice/authSlice';
import userReducer from '../Redux/authSlice/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
