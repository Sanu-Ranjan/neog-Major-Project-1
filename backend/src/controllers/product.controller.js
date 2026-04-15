const { Product } = require("../models/models.index");

const { err, failure, ok, success } = require("../utils/response");

const findAll = async () => {
  try {
    const data = await Product.find().populate("category");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const byId = async (productId) => {
  try {
    const data = await Product.findById(productId);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const add = async (product) => {
  try {
    const saved = await Product.create(product);
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const productList = async (req, res) => {
  try {
    const { data, error } = await findAll();
    if (error) {
      console.log("Error fetching all products", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    res.status(200).json(success({ products: data }, "Products fetched"));
  } catch (error) {
    console.log("Error at controller: product ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const productById = async (req, res) => {
  const { productId } = req.params;
  try {
    const { data, error } = await byId(productId);
    if (error) {
      console.log("Error fetching product by id", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    res.status(200).json(success({ product: data }, "product fetched"));
  } catch (error) {
    console.log("Error at controller: productById ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addProduct = async (req, res) => {
  const products = req.body;
  try {
    const { data, error } = await add(products);
    if (error) {
      console.log("Error adding products", error);
      return res.status(500).json(
        failure("Internal server error : database operation failed", {
          detail: error.message,
        }),
      );
    }

    res.status(201).json(success("product added", { product: data }));
  } catch (error) {
    console.log("Error at controller: addCategory ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  productList,
  productById,
  addProduct,
};
