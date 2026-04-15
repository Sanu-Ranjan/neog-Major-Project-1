const router = require("express").Router();
const {
  addCategory,
  byId,
  featured,
  list,
} = require("../controllers/categories.controller");

router.get("/featured", featured);

router.get("/", list);

router.get("/:categoryId", byId);

router.post("/", addCategory);

module.exports = {
  router,
};
