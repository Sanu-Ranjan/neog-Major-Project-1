const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  pincode: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  assressLine: { type: String, require: true },
  type: { type: String, require: true },
});

const Address = model("Address", addressSchema);

module.exports = {
  Address,
};
