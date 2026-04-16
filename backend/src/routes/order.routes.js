const router = require("express").Router();

const {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.get("/", getOrders);
router.get("/id/:id", getOrder);
router.post("/", addOrder);
router.delete("/", deleteOrder);

module.exports = { router };
