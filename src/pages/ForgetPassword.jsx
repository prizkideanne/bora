import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../utils/constants";
import { useState } from "react";

function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      const { email } = values;
      setErrorMessage("");
      axios
        .put(API + "/auth/forgotPass", {
          email,
        })
        .then(({ data }) => {
          alert(data.message);
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
        });
    },
  });
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <p className="text-[68px] font-bold text-red-700 rotate-[10deg] mb-20 absolute top-20 mx-auto">
        {errorMessage}
      </p>
      <p className="text-[68px] font-bold text-blue-700 rotate-[-90deg] left-44 absolute text-center">
        FORGET <br />
        PASSWORD
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center bg-yellow-400 p-5"
      >
        <div className="flex flex-col w-[400px]">
          <label>Please input email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border border-black mt-5"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500">{formik.errors.email}</span>
          ) : null}
        </div>
        <button
          type="submit"
          className="py-1 px-4 bg-white hover:opacity-75 my-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
