import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserData } from "../store/userReducer/userSlice";
import { useNavigate } from "react-router-dom";
YupPassword(Yup);

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        // .email("Please use email format")
        .required("This field is required"),
      password: Yup.string().required("This field is required"),
      // .min(6, "Password Minimum 6 characters")
      // .minLowercase(1, "Minimum lowercase 1 character")
      // .minSymbols(1, "Minimum special character is 1 character")
      // .minUppercase(1, "Minimum Uppercase character is 1 character"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      setErrorMessage("");
      handleLogin(email, password);
    },
  });

  const handleLogin = (email, password) => {
    axios
      .post(`${API}/auth/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        const { id, email, imgProfile, phone, username } = data.isAccountExist;
        const userData = {
          token: data.token,
          id,
          email,
          imgProfile,
          phone,
          username,
        };
        dispatch(addUserData(userData));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <p className="text-[68px] font-bold text-red-700 rotate-[10deg] mb-20 absolute top-20 mx-auto">
        {errorMessage}
      </p>
      <div className="flex flex-col items-center justify-center bg-pink-400 w-[600px]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col w-[400px]">
            <input
              id="email"
              type="email"
              placeholder="Email/Username/Phone"
              className="border border-black"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <input
              className="border border-black"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="py-1 px-4 bg-white hover:opacity-75">
            Login
          </button>
        </form>

        <button>Forget Password</button>
        <p>
          Don't have an account? <span>Register Here</span>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
