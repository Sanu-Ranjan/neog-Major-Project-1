const { Address } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const addresses = async () => {
  try {
    const data = await Address.find();
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const addressById = async (id) => {
  try {
    const data = await Address.findById(id);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const create = async (address) => {
  try {
    const saved = await Address.create(address);
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const getAddresses = async (req, res) => {
  try {
    const { data, error } = await addresses();
    if (error) {
      console.log("Error fetching addresses", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ addresses: data }, "Addresses fetched"));
  } catch (error) {
    console.log("Error at controller: getAddresses", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const getAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await addressById(id);
    if (error) {
      console.log("Error fetching address", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Address not found"));
    }
    res.status(200).json(success({ address: data }, "Address fetched"));
  } catch (error) {
    console.log("Error at controller: getAddress", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addAddress = async (req, res) => {
  const { name, phone, pincode, city, state, addressLine, type } = req.body;

  try {
    const { data, error } = await create({
      name,
      phone,
      pincode,
      city,
      state,
      addressLine,
      type,
    });
    if (error) {
      console.log("Error adding address", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(201).json(success({ address: data }, "Address added"));
  } catch (error) {
    console.log("Error at controller: addAddress", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = { getAddresses, getAddress, addAddress };
