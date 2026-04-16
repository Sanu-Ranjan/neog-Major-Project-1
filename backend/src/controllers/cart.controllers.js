const { Cart } = require("../models/models.index");

const { err, failure, ok, success } = require("../utils/response");

let cartItems_cache = [];

const cart = async () => {
  try {
    const data = await Cart.find().populate("items.product");
    cartItems_cache = data;
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const update = async (cartId, updatedItems) => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { items: updatedItems } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const add = async (cart) => {
  try {
    const saved = await Cart.create(cart);
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { data, error } = await cart();
    if (error) {
      console.log("Error fetching cart", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ cart: data }, "Cart fetched"));
  } catch (error) {
    console.log("Error at controller: product ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addCart = async (req, res) => {
  const { items } = req.body;
  try {
    const { data, error } = await add({ items });
    if (error) {
      console.log("Error adding cart", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(201).json(success({ cart: data }, "Cart added"));
  } catch (error) {
    console.log("Error at controller: addCart ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;

  try {
    const { data, error } = await update(cartId, items);
    if (error) {
      console.log("Error updating cart", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ cart: data }, "Cart updated"));
  } catch (error) {
    console.log("Error at controller: updateCart", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  updateCart,
  addCart,
  getCart,
};
