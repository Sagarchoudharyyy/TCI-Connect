export const getProfileImageUrl = (profileImage) => {
    if (!profileImage) {
        return null;
    }

    // Keep temporary/local preview URLs unchanged
    if (
        profileImage.startsWith("blob:") ||
        profileImage.startsWith("data:") ||
        profileImage.startsWith("http://") ||
        profileImage.startsWith("https://")
    ) {
        return profileImage;
    }

    let profilePath = profileImage.replace(/\\/g, "/");

    profilePath = profilePath.replace(/^uploads\//, "");

    if (!profilePath.startsWith("profile/")) {
        profilePath = `profile/${profilePath}`;
    }

    return `${import.meta.env.VITE_FILE_URL}/${profilePath}`;
};