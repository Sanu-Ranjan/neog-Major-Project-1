const mongoose = require("mongoose");
const { Cart } = require("./cart.models");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  inStock: { type: Boolean, require: true },
  rating: { type: Number, require: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
