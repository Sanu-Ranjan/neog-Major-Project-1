const router = require("express").Router();

const {
  addProduct,
  productList,
  productById,
} = require("../controllers/product.controller");

router.get("/", productList);

router.get("/:productId", productById);

router.post("/", addProduct);

module.exports = {
  router,
};
