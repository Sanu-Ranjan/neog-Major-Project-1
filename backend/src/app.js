const express = require("express");
const cors = require("cors");

const category = require("./routes/categories.router");
const product = require("./routes/product.router");
const cart = require("./routes/cart.routes");
const wishlist = require("./routes/wishlist.routes");
const address = require("./routes/address.routes");
const order = require("./routes/order.routes");

const app = express();

app.use(express.json());

const ALLOWED_ORIGINS = process.env.ORIGIN;
if (!ALLOWED_ORIGINS) {
  console.log("Error : allowed ORIGIN not set");
  process.exit(1);
}

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use("/api/v1/categories", category.router);
app.use("/api/v1/products", product.router);
app.use("/api/v1/cart", cart.router);
app.use("/api/v1/wishlist", wishlist.router);
app.use("/api/v1/address", address.router);
app.use("/api/v1/orders", order.router);

module.exports = {
  app,
};
