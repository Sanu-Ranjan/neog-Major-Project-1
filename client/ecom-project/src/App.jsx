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
import { CartProvider } from "./contexts/CartContext";
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
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
