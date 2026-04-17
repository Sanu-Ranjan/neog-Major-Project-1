export const API_BASE_URL = import.meta.env.VITE_BACKEND;
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  WISHLIST: "/wishlist",
  CART: "/cart",
  PROFILE: "/profile",
};
