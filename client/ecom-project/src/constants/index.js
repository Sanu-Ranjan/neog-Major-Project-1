export const API_BASE_URL = import.meta.env.VITE_BACKEND;
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  WISHLIST: "/wishlist",
  CART: "/cart",
  PROFILE: "/profile",
  ORDER_SUMMARY: (orderId) => `/ordersummary/${orderId}`,
};

export const API_ROUTES = {
  products: {
    getAll: "/products",
    getById: (id) => `/products/${id}`,
    add: "/products",
  },

  category: {
    getAll: "/categories",
    getFeatured: "/categories/featured",
    getById: (id) => `/categories/${id}`,
    add: "/categories",
  },

  cart: {
    get: "/cart",
    add: "/cart",
    update: (id) => `/cart/${id}`,
  },

  wishlist: {
    get: "/wishlist",
    create: "/wishlist",
    addItem: "/wishlist/item",
    deleteItem: "/wishlist",
  },

  address: {
    getAll: "/address",
    getById: (id) => `/address/id/${id}`,
    add: "/address",
    update: (id) => `/address/${id}`,
    delete: (id) => `/address/${id}`,
  },

  orders: {
    getAll: "/orders",
    getById: (id) => `/orders/id/${id}`,
    add: "/orders",
    delete: "/orders",
  },

  ai: {
    search: "/ai/search",
  },
};
