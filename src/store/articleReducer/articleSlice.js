import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    selectedArticle: null,
  },
  reducers: {
    addSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
    resetSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedArticle, resetSelectedArticle } =
  articleSlice.actions;

export default articleSlice.reducer;
