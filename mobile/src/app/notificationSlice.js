import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notifications: [],
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
    updateNotification: (state, action) => {
      state.notifications = state.notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
    },
  },
});
export const {
  setNotifications,
  addNotification,
  removeNotification,
  updateNotification,
} = notificationSlice.actions;
export const selectNotifications = (state) => state.notification.notifications;
export default notificationSlice.reducer;
