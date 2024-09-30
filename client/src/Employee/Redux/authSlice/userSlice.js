import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  role: '',
  employeeId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.role = action.payload.employeeId;

    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
