import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    userData: {
      token: null,
      id: null,
      email: null,
      imgProfile: null,
      phone: null,
      username: null,
    },
  },
  reducers: {
    addUserData: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.userData = {
        token: null,
        id: null,
        email: null,
        imgProfile: null,
        phone: null,
        username: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserData, logout } = userSlice.actions;

export default userSlice.reducer;
