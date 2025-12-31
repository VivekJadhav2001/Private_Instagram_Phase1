import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    </Provider>
  </StrictMode>
);
