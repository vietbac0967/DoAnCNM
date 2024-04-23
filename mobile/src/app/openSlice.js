import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
export const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
export const { setOpen } = openSlice.actions;
export const selectOpen = (state) => state.open.isOpen;
export default openSlice.reducer;
