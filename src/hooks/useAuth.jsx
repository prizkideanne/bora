import axios from "axios";
import { useDispatch } from "react-redux";
import { API } from "../utils/constants";
import {
  addUserData,
  logout as logoutRedux,
} from "../store/userReducer/userSlice";

const useAuth = ({ token }) => {
  const dispatch = useDispatch();

  const getProfileWithToken = async () =>
    await axios
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
          token,
        };
        dispatch(addUserData(userData));
      })
      .catch((err) => console.log(err));

  const logout = () => {
    dispatch(logoutRedux());
  };

  return {
    getProfileWithToken,
    logout,
  };
};

export default useAuth;
