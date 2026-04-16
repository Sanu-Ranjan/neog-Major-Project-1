const router = require("express").Router();

const {
  addCart,
  getCart,
  updateCart,
} = require("../controllers/cart.controllers");

router.get("/", getCart);

router.post("/", addCart);

router.put("/:cartId", updateCart);

module.exports = {
  router,
};
