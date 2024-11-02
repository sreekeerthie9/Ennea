import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import NewProductPage from "./pages/NewProduct"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new",
    element: <NewProductPage/>
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
