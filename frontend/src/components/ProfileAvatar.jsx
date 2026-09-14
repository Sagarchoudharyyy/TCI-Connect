import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getProfileImageUrl } from "../services/fileservice";
import "./../DoctorStyle/ProfileAvatar.css";

function ProfileAvatar({
  profileImage,
  size = 40,
  className = "",
}) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = getProfileImageUrl(profileImage);

  const showDefault = !imageUrl || imageError;

  if (showDefault) {
    return (
      <div
        className={`profile-avatar-default ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size}px`,
        }}
      >
        <FaUserCircle />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Profile"
      className={`profile-avatar-image ${className}`}
      width={size}
      height={size}
      onError={() => setImageError(true)}
    />
  );
}

export default ProfileAvatar;