import { RouterProvider } from "react-router-dom";
import createBrowserRouter from "./router/Router";

function App() {
  return (
    <RouterProvider router={createBrowserRouter} />
  )
}

export default App;
