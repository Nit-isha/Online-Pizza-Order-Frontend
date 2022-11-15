import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { UserProvider } from "./hooks/useUser";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import store from "./redux/Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<UserProvider>
				<ToastContainer />
				<App />
			</UserProvider>
		</Provider>
	</React.StrictMode>
);
