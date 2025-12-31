import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  if (!authChecked) return null;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default AuthRoute;
