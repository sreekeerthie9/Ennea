/* Create a React application with two pages. Page 1 includes two Ant Design DatePickers 
for a start date (defaulting to 7 days ago) and an end date (defaulting to today), ensuring 
the end date restricts earlier dates. Add a search input and filter option to fetch and display 
product data from dummyjson.com in a custom table. Include a button to open a modal for entering 
new product details, and upon submission, redirect to Page 2. On Page 2, prefill the form with the 
entered details, ask for confirmation, and send a POST request to create the product.	
	
	
	 */


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ProductsPage from "./pages/Products";
import { queryClient } from "./util/http";
import { QueryClientProvider } from "@tanstack/react-query";
import NewProduct from "./pages/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/new",
        element: <NewProduct />,
        
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
