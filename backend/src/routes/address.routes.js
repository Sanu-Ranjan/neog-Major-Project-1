const router = require("express").Router();

const {
  getAddresses,
  getAddress,
  addAddress,
} = require("../controllers/address.controller");

router.get("/", getAddresses);
router.get("/id/:id", getAddress);
router.post("/", addAddress);

module.exports = { router };
