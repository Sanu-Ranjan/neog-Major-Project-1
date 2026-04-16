const router = require("express").Router();

const {
  getWishlist,
  addWishlist,
  addWishlistItem,
  deleteWishlistItem,
} = require("../controllers/wishlist.controller");

router.get("/", getWishlist);
router.post("/", addWishlist);
router.post("/item", addWishlistItem);
router.delete("/", deleteWishlistItem);

module.exports = { router };
