import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  //Loading phase
  if (!authChecked) {
    return <div className="text-white p-10">Loading...</div>;
  }

  // If Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //iF logged in
  return children;
};

export default ProtectedRoute;
