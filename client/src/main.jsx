import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import { store } from "./store/store.js";
import Connections from "./pages/Connections.jsx";
import Requests from "./pages/Requests.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />}>

          {/* Protected Route */}
          <Route
            index
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                {" "}
                <Connections />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                {" "}
                <Requests />{" "}
              </ProtectedRoute>
            }
          />

          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
