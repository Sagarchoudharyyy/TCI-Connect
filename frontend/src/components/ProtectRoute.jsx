import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    children,
    allowedRoles
}) => {

    const token = localStorage.getItem("token");

    const userString = localStorage.getItem("user");

    const user =
        userString &&
            userString !== "undefined"
            ? JSON.parse(userString)
            : null;

    if (!token || !user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;