import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Menu from "../components/menu/Menu";
import About from "../components/customer/About";
import UpdateCredentials from "../components/customer/UpdateCredentials";
import UpdatePassword from "../components/customer/UpdatePassword";
import UpdateUsername from "../components/customer/UpdateUsername";
import Cart from "../components/Cart";
import Payment from "../components/Payment";
import Orders from "../components/order-history/Orders";
import OrderById from "../components/order-history/OrderById";

export default createBrowserRouter([
	{ path: "/", element: <Navigate to="/menu" replace /> },
	{ path: "/menu", element: <Menu /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/user/about", element: <About /> },
	{ path: "/user/update", element: <UpdateCredentials /> },
	{ path: "/user/update_pass", element: <UpdatePassword /> },
	{ path: "/user/update_uname", element: <UpdateUsername /> },
	{ path: "/cart", element: <Cart /> },
	{ path: "/payment", element: <Payment /> },
	{ path: "/orders", element: <Orders /> },
	{ path: "/orders/:orderId", element: <OrderById /> },
]);
