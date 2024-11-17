import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import navSlice from "./slices/navSlice";
import postSlice from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    "Key to identify slice ": "slice file",
    // shakkar: shakkarSlice,
    auth: authSlice,
    nav: navSlice,
    posts: postSlice,
  },
});
