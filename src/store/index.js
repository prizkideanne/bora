import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleReducer/articleSlice";

export default configureStore({
  reducer: {
    article: articleSlice,
  },
});
