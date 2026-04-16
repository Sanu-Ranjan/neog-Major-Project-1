const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  addressLine: { type: String, required: true },
  type: { type: String, required: true },
});

const Address = model("Address", addressSchema);

module.exports = {
  Address,
};
