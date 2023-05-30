import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserData } from "../store/userReducer/userSlice";
import { Link, useNavigate } from "react-router-dom";
YupPassword(Yup);

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
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
        navigate("/", { replace: true });
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
      <p className="text-[68px] font-bold text-blue-700 rotate-[-90deg] left-44 absolute">
        LOGIN
      </p>
      <div className="flex flex-col items-center justify-center bg-yellow-400 w-[600px] rounded-lg">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col w-[400px] mt-5">
            <input
              id="email"
              type="email"
              placeholder="Email/Username/Phone"
              className="border border-[#1B3044] rounded-md p-1"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-500">{formik.errors.email}</span>
            ) : null}

            <div className="bg-white flex flex-row border border-[#1B3044] mt-5 rounded-md p-1">
              <input
                className="flex flex-1"
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="w-20 text-gray-50 bg-blue-600 hover:opacity-75 rounded-md"
              >
                {isShowPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-500">{formik.errors.password}</span>
            ) : null}
          </div>
          <button
            type="submit"
            className="py-1 px-4 bg-white hover:opacity-75 border border-[#1B3044] my-5 rounded-md text-[#1B3044]"
          >
            Login
          </button>
        </form>

        <div className="flex items-center flex-col mb-5">
          <Link to="/forget-password">
            <span className="underline text-[#1B3044]">Forget Password</span>
          </Link>
          <p className="mt-2 text-[#1B3044]">
            Don&apos;t have an account?{" "}
            <Link to="/register">
              <span className="underline text-[#1B3044]">Register here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
