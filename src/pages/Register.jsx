import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please use email format")
        .required("This field is required"),
      username: Yup.string()
        .required("This field is required")
        .min(5, "Minimum 5 characters"),
      phone: Yup.string()
        .required("This field is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Minimum 10 characters")
        .max(12, "Maximum 12 characters"),
      password: Yup.string()
        .required("This field is required")
        .min(6, "Password Minimum 6 characters")
        .minLowercase(1, "Minimum lowercase 1 character")
        .minSymbols(1, "Minimum special character is 1 character")
        .minNumbers(1, "Minimum number is 1 character")
        .minUppercase(1, "Minimum Uppercase character is 1 character"),
      confirmPassword: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      setErrorMessage("");
      handleOnRegister(values);
    },
  });

  const handleOnRegister = (values) => {
    const { email, username, phone, password, confirmPassword } = values;
    axios
      .post(API + "/auth", {
        email,
        username,
        phone,
        password,
        confirmPassword,
      })
      .then(({ data }) => {
        console.log(data);
        alert("Register success, " + data.message);
        navigate("/login", { replace: true });
      })
      .catch(({ response }) => {
        setErrorMessage(response.data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <p className="text-[68px] font-bold text-red-700 rotate-[10deg] mb-20 absolute top-20 mx-auto">
        {errorMessage}
      </p>
      <p className="text-[68px] font-bold text-blue-700 rotate-[-90deg] left-28 absolute">
        REGISTER
      </p>
      <form
        onClick={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col items-center justify-center bg-yellow-400 w-[600px]"
      >
        <div className="flex flex-col w-[400px] my-5">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border border-black mb-5"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500">{formik.errors.email}</span>
          ) : null}

          <input
            className="border border-black mb-5"
            type="text"
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="text-red-500">{formik.errors.username}</span>
          ) : null}

          <input
            className="border border-black mb-5"
            type="text"
            placeholder="Phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <span className="text-red-500">{formik.errors.phone}</span>
          ) : null}

          <div className="bg-white flex flex-row border border-black mb-5">
            <input
              className="flex flex-1"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="w-20 text-gray-50 bg-blue-600 hover:opacity-75"
            >
              {isShowPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-500">{formik.errors.password}</span>
          ) : null}

          <div className="bg-white flex flex-row border border-black">
            <input
              className="flex flex-1"
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            <button
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              className="w-20 text-gray-50 bg-blue-600 hover:opacity-75"
            >
              {isShowConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="text-red-500">
              {formik.errors.confirmPassword}
            </span>
          ) : null}
        </div>
        <button
          type="submit"
          className="py-1 px-4 bg-white hover:opacity-75 mb-5"
        >
          Register
        </button>
        <p className="mb-5">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline">Login here</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
