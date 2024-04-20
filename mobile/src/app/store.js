import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import notificationReducer from "./notificationSlice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});
