const { Schema, model } = require("mongoose");
// _id (PK)
// items: Array of { productId: ObjectId (ref -> Products), name: String, price: Number, quantity: Number, image: String }
// totalAmount: Number
// deliveryCharge: Number
// address: { name: String, phone: String, pincode: String, city: String, state: String, addressLine: String, type: String }
// placedAt: Date

const orderSchema = new Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, require: true },
  deliveryCharge: { type: Number, require: true },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    addressLine: { type: String, required: true },
    type: { type: String },
  },
  placedAt: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);

module.exports = {
  Order,
};
