const { Category } = require("../models/models.index");

const { err, failure, ok, success } = require("../utils/response");

const findBy = async (queryObj) => {
  try {
    const data = await Category.find(queryObj);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const categoryById = async (categoryId) => {
  try {
    const data = await Category.findById(categoryId);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};
const findAll = async () => {
  try {
    const data = await Category.find();
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const add = async (category) => {
  try {
    const saved = await Category.create(category);
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const featured = async (req, res) => {
  try {
    const { data, error } = await findBy({ isFeatured: true });
    if (error) {
      console.log("Error fetching categoryCategory by feature ", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    res
      .status(200)
      .json(success({ categories: data }, "Featured categories fetched"));
  } catch (error) {
    console.log("Error at controller: featured", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const list = async (req, res) => {
  try {
    const { data, error } = await findAll();
    if (error) {
      console.log("Error fetching all categoryCategory", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    res.status(200).json(success({ categories: data }, "Category fetched"));
  } catch (error) {
    console.log("Error at controller: categoryList ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const byId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const { data, error } = await categoryById(categoryId);
    if (error) {
      console.log("Error fetching category by id", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    res.status(200).json(success({ category: data }, "category fetched"));
  } catch (error) {
    console.log("Error at controller: categoryById ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addCategory = async (req, res) => {
  const categories = req.body;
  try {
    const { data, error } = await add(categories);
    if (error) {
      console.log("Error adding category", error);
      return res.status(500).json(
        failure("Internal server error : database operation failed", {
          detail: error.message,
        }),
      );
    }

    res.status(201).json(success("Category added", { category: data }));
  } catch (error) {
    console.log("Error at controller: addCategory ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  list,
  byId,
  addCategory,
  featured,
};
