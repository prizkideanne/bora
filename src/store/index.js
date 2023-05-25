import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleReducer/articleSlice";
import userSlice from "./userReducer/userSlice";

export default configureStore({
  reducer: {
    article: articleSlice,
    user: userSlice,
  },
});
