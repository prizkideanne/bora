import PhotoProfile from "./PhotoProfile";

function EditPhotoProfile({
  previewImg,
  imgProfile,
  handleChangeProfilePicture,
}) {
  return (
    <div className="flex flex-row items-center mb-10">
      <PhotoProfile
        image={previewImg || imgProfile}
        disableImageLink={previewImg}
        className={"w-40 h-40 mr-5 border border-[#1B3044]"}
      />

      <p className="ml-10 text-[#1B3044] font-medium">
        Click the button below to change your profile picture. <br />
        <input
          type="file"
          onChange={(e) => handleChangeProfilePicture(e.target.files[0])}
        />
      </p>
    </div>
  );
}

export default EditPhotoProfile;
