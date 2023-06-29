import { configureStore } from "@reduxjs/toolkit";
import chatDataReducer from "./slices/chatSlice";
import authDataReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    chatDataReducer,
    authDataReducer,
  },
});
