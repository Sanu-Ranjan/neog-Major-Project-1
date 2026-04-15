const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
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
