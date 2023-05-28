function EditProfileFormField({
  formik,
  title,
  fieldName,
  isShowPassword = true,
  setIsShowPassword,
}) {
  const isUserInformation = ["username", "email", "phone"].includes(fieldName);
  return isUserInformation ? (
    <div className="flex flex-row items-center mb-5">
      <p className="w-[200px]">{title}</p>
      <div className="flex flex-1 flex-row items-center">
        <input
          type="text"
          className={`p-2 rounded-md ${
            isUserInformation ? "w-full" : "w-full xl:w-[650px]"
          }`}
          {...formik.getFieldProps(fieldName)}
        />
        {formik.touched[fieldName] && formik.errors[fieldName] ? (
          <p className="text-red-500 ml-5">{formik.errors[fieldName]}</p>
        ) : null}
      </div>
      {isUserInformation && (
        <div className="flex items-end ml-10">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="bg-green-600 py-2 px-3 text-white rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-row items-center mb-5">
      <p className="w-[200px]">{title}</p>
      <div className="flex flex-1 flex-row items-center">
        <div className="bg-white flex w-[500px] flex-row border border-black mt-5">
          <input
            type={isShowPassword ? "text" : "password"}
            className={`p-2 rounded-md w-full xl:w-[650px]
          `}
            {...formik.getFieldProps(fieldName)}
          />
          <button
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="w-20 px-3 text-gray-50 bg-blue-600 hover:opacity-75"
          >
            {isShowPassword ? "Hide" : "Show"}
          </button>
        </div>
        {formik.touched[fieldName] && formik.errors[fieldName] ? (
          <p className="text-red-500 ml-5">{formik.errors[fieldName]}</p>
        ) : null}
      </div>
    </div>
  );
}

export default EditProfileFormField;
