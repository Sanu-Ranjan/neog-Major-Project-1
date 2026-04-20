import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../constants";
import { postData } from "../utils/postData";
import { deleteData } from "../utils/deleteData";
const posturl = `${API_BASE_URL}/wishlist/item`;
const deleteUrl = `${API_BASE_URL}/wishlist`;
const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/wishlist`,
    refresh,
  );

  const wishlist = data?.data?.wishlist?.[0];
  const addItem = async (productId) => {
    if (!wishlist?._id) return;
    const { data, error } = await postData(posturl, {
      wishlistId: wishlist?._id,
      productId: productId,
    });
    if (error) {
      console.log(error);
    } else if (data?.success) {
      setRefresh((prev) => !prev);
    }
  };

  const deleteItem = async (productId) => {
    if (!wishlist?._id) return;
    const { data, error } = await deleteData(deleteUrl, {
      wishlistId: wishlist?._id,
      productId: productId,
    });
    if (error) {
      console.log(error);
    } else if (data?.success) {
      setRefresh((prev) => !prev);
    }
  };

  const wishlistSet = new Set();
  const items = wishlist?.items ?? [];
  items.forEach((element) => {
    wishlistSet.add(element._id);
  });

  return (
    <WishListContext.Provider
      value={{ data, loading, error, addItem, deleteItem, wishlistSet }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
