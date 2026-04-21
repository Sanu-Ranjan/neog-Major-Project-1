import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/index";
import { putData } from "../utils/putData";
import { postData } from "../utils/postData";
const CartContext = createContext();
const getCartUrl = `${API_BASE_URL}/cart`;

export const CartProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch(getCartUrl, refresh);

  const cart = data?.data?.cart?.[0]; // first cart doc
  const cartId = cart?._id; // needed for update/delete calls later
  const items = cart?.items ?? [];

  const addToCart = async (id) => {
    let found = false;
    const newItemList = items.map(({ product, quantity }) => {
      const temp = {
        product: product._id,
        quantity: quantity,
      };

      if (product._id == id) {
        found = true;
        temp.quantity++;
      }
      return temp;
    });

    if (!found) newItemList.push({ product: id, quantity: 1 });

    const body = {
      items: newItemList,
    };

    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;

    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) return console.log("error updating cart : ", error);

      if (data.success == true) setRefresh((prev) => !prev);
      else console.log("Error updating cart : ", data.message);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const decQty = async (id) => {
    const newItemList = items.map(({ product, quantity }) => {
      const temp = {
        product: product._id,
        quantity: quantity,
      };
      if (product._id == id) {
        temp.quantity--;
      }
      return temp;
    });
    const body = {
      items: newItemList,
    };

    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;

    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) return console.log("error updating cart : ", error);
      if (data.success == true) setRefresh((prev) => !prev);
      else console.log("Error updating cart : ", data.message);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeItem = async (id) => {
    const newItemList = items.map(({ product, quantity }) => {
      const temp = {
        product: product._id,
        quantity: quantity,
      };
      return temp;
    });

    const body = {
      items: items.filter(({ product }) => id != product._id),
    };
    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;
    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) return console.log("error updating cart : ", error);
      if (data.success == true) setRefresh((prev) => !prev);
      else console.log("Error updating cart : ", data.message);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        items,
        loading,
        error,
        addToCart,
        decQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
