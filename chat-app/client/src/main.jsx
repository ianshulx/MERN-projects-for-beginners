import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Settings from "./pages/Settings.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectMsgRoute, {
  ProtectAuthRoute,
} from "./components/protectRoute.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectMsgRoute>
            <Home />
          </ProtectMsgRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectMsgRoute>
            <Profile />
          </ProtectMsgRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectAuthRoute>
            <Login />
          </ProtectAuthRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectAuthRoute>
            <Signup />
          </ProtectAuthRoute>
        ),
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
