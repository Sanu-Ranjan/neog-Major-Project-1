const router = require("express").Router();
const { aiSearch } = require("../controllers/ai.controller");

router.post("/search", aiSearch);

module.exports = { router };
