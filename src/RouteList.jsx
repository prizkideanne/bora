import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API } from "./utils/constants";
import { addUserData } from "./store/userReducer/userSlice";
import LandingPage from "./pages/LandingPage";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Article from "./pages/Article";
import Search from "./pages/Search";
import { useDispatch } from "react-redux";

function RouteList() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      axios
        .get(API + "/auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          const { id, email, imgProfile, phone, username } = data;
          const userData = {
            id,
            email,
            imgProfile,
            phone,
            username,
          };
          dispatch(addUserData(userData));
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/article"
          element={
            <Layout>
              <Article />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteList;
