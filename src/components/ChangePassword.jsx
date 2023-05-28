import { useState } from "react";
import EditProfileFormField from "./EditProfileFormField";

function ChangePassword({ passwordForm }) {
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mb-10 w-full border-b border-gray-400">
        <p className="text-[32px] font-semibold">Change Password</p>
      </div>
      <form onSubmit={passwordForm.handleSubmit} className="flex flex-col">
        <EditProfileFormField
          formik={passwordForm}
          title="Old Password"
          fieldName={"oldPassword"}
          isShowPassword={isShowOldPassword}
          setIsShowPassword={setIsShowOldPassword}
        />
        <EditProfileFormField
          formik={passwordForm}
          title="New Password"
          fieldName={"newPassword"}
          isShowPassword={isShowNewPassword}
          setIsShowPassword={setIsShowNewPassword}
        />
        <EditProfileFormField
          formik={passwordForm}
          title="Confirm Password"
          fieldName={"confirmPassword"}
          isShowPassword={isShowConfirmPassword}
          setIsShowPassword={setIsShowConfirmPassword}
        />
        <div className="w-full flex items-center justify-end">
          <button
            type="submit"
            className="bg-green-600 p-3 text-white rounded-lg font-semibold mt-10"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
