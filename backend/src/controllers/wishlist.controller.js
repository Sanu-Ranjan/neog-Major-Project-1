const { Wishlist } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const wishlist = async () => {
  try {
    const data = await Wishlist.find().populate("items");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const create = async (items) => {
  try {
    const saved = await Wishlist.create({ items });
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const addItem = async (wishlistId, productId) => {
  try {
    const updated = await Wishlist.findByIdAndUpdate(
      wishlistId,
      { $addToSet: { items: productId } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const removeItem = async (wishlistId, productId) => {
  try {
    const updated = await Wishlist.findByIdAndUpdate(
      wishlistId,
      { $pull: { items: productId } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const getWishlist = async (req, res) => {
  try {
    const { data, error } = await wishlist();
    if (error) {
      console.log("Error fetching wishlist", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ wishlist: data }, "Wishlist fetched"));
  } catch (error) {
    console.log("Error at controller: getWishlist", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addWishlist = async (req, res) => {
  const { items } = req.body;
  try {
    const { data, error } = await create(items);
    if (error) {
      console.log("Error creating wishlist", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(201).json(success({ wishlist: data }, "Wishlist created"));
  } catch (error) {
    console.log("Error at controller: addWishlist", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addWishlistItem = async (req, res) => {
  const { wishlistId, productId } = req.body;
  try {
    const { data, error } = await addItem(wishlistId, productId);
    if (error) {
      console.log("Error adding wishlist item", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ wishlist: data }, "Item added to wishlist"));
  } catch (error) {
    console.log("Error at controller: addWishlistItem", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const deleteWishlistItem = async (req, res) => {
  const { wishlistId, productId } = req.body;
  try {
    const { data, error } = await removeItem(wishlistId, productId);
    if (error) {
      console.log("Error removing wishlist item", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res
      .status(200)
      .json(success({ wishlist: data }, "Item removed from wishlist"));
  } catch (error) {
    console.log("Error at controller: deleteWishlistItem", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  getWishlist,
  addWishlist,
  addWishlistItem,
  deleteWishlistItem,
};
