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
import { SearchProvider } from "./contexts/SearchContext";
import { WishlistProvider } from "./contexts/WishlistContext";
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
  return (
    <WishlistProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </WishlistProvider>
  );
}

export default App;
