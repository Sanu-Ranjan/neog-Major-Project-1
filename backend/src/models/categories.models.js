const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  isFeatured: { type: Boolean, default: false },
});

const Categories = mongoose.model("Categories", categorySchema);

module.exports = {
  Categories,
};
