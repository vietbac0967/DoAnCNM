import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import notificationReducer from "./notificationSlice";
import userReducer from "./userSlice";
import openReducer from "./openSlice";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: notificationReducer,
    user: userReducer,
    open: openReducer,
  },
});
