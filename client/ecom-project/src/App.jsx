import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  ProductDetails,
  ProductList,
  Wishlist,
  Cart,
  UserProfile,
} from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/user",
    element: <UserProfile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
