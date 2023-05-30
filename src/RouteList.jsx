import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LogIn from "./pages/LogIn";
import Layout from "./components/Layout";
import Article from "./pages/Article";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import useAuth from "./hooks/useAuth";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import ForgetPassword from "./pages/ForgetPassword";
import PrivateWrapper from "./PrivateWrapper";
import PublicWrapper from "./PublicWrapper";

function RouteList() {
  const token = localStorage.getItem("token");
  const { getProfileWithToken } = useAuth({ token });

  useEffect(() => {
    if (token) {
      getProfileWithToken();
    }
  }, [token, getProfileWithToken]);

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
        <Route element={<PublicWrapper />}>
          <Route
            path="/login"
            element={
              <Layout>
                <LogIn />
              </Layout>
            }
          />
        </Route>
        <Route element={<PublicWrapper />}>
          <Route
            path="/forget-password"
            element={
              <Layout>
                <ForgetPassword />
              </Layout>
            }
          />
        </Route>
        <Route element={<PublicWrapper />}>
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Route>
        <Route
          path="/article/:id"
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
        <Route element={<PrivateWrapper />}>
          <Route
            path="/create"
            element={
              <Layout>
                <Create />
              </Layout>
            }
          />
        </Route>

        <Route element={<PublicWrapper />}>
          <Route
            path="/verification/:token"
            caseSensitive={false}
            element={<Verification />}
          />
        </Route>
        <Route element={<PublicWrapper />}>
          <Route
            path="/verification-change-email/:token"
            caseSensitive={false}
            element={<Verification />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteList;
