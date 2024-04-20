import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
