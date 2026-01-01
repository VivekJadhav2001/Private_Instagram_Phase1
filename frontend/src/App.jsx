import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./features/authSlice";
import Home from "./pages/Home";
import AuthRoute from "./contexts/AuthRoute.jsx"
import Profile from "./pages/Profile.jsx";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        }
      />


      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }
      />
    </Routes>
  );
}

export default App;
