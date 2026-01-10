import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  //Loading phase
  if (!authChecked) {
    return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        
        {/* Instagram-like Logo Text */}
        <h1 className="text-4xl font-semibold font-[cursive] text-black">
         Welcome to Private Instagram. Hang tight — the backend is warming up.
        </h1>

        {/* Spinner */}
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>

        {/* Sub text */}
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );

  }

  // If Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //iF logged in
  return children;
};

export default ProtectedRoute;
