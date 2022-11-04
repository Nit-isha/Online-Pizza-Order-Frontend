import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Menu from "../components/Menu";
import About from "../components/customer/About";
import Update from "../components/customer/Update";

export default createBrowserRouter([
  { path: "/", element: <Navigate to="/menu" replace /> },
  { path: "/menu", element: <Menu /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/user/about", element: <About /> },
  { path: "/user/update", element: <Update /> },
]);
