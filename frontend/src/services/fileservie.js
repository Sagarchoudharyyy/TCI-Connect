export const getProfileImageUrl = (profileImage) => {
    if (!profileImage) {
        return "/default-profile.png";
    }

    let profilePath = profileImage.replace(/\\/g, "/");

    // Remove uploads/ if backend returns it
    profilePath = profilePath.replace(/^uploads\//, "");

    // Make sure profile/ exists
    if (!profilePath.startsWith("profile/")) {
        profilePath = `profile/${profilePath}`;
    }

    return `${import.meta.env.VITE_FILE_URL}/${profilePath}`;
};