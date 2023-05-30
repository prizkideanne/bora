import EditProfileFormField from "./EditProfileFormField";

function UserInformation({ usernameForm, emailForm, phoneForm }) {
  return (
    <div className="flex flex-col">
      <div className="w-full border-b border-gray-400">
        <p className="text-[30px] font-semibold text-[#1B3044]">User Information</p>
      </div>
      <p className="mb-10 mt-3 text-sm text-[#1B3044] font-medium">
        *Changing your username, email, or phone will need you to verify it on
        email after click save button
      </p>
      <div className="flex flex-col">
        <EditProfileFormField
          formik={usernameForm}
          title="Username"
          fieldName={"username"}
        />
        <EditProfileFormField
          formik={emailForm}
          title="Email"
          fieldName={"email"}
        />
        <EditProfileFormField
          formik={phoneForm}
          title="Phone"
          fieldName={"phone"}
        />
      </div>
    </div>
  );
}

export default UserInformation;
