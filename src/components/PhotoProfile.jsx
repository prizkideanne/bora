import { imageLink } from "../utils/constants";

function PhotoProfile({ image, className, disableImageLink = false }) {
  return (
    <img
      src={
        image
          ? disableImageLink
            ? image
            : imageLink + image
          : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2013%2F05%2Fb31.jpg"
      }
      className={`w-10 h-10 rounded-full border-2 border-black object-cover ${className}`}
    />
  );
}

export default PhotoProfile;
