import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import ProductContextProvider from "./context/products-context.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import ProductsPage from "./pages/Products.jsx";
import NewProduct from "./pages/NewOrEditProduct.jsx";
import ProductDetailsPage from "./pages/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },
      { path: "/new", element: <NewProduct /> },
      { path: "/categories/:categoryName", element: <CategoryList /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductContextProvider>
        <RouterProvider router={router} />
      </ProductContextProvider>
    </QueryClientProvider>
  );
}
