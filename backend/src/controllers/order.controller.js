const { Order, Product } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const orders = async () => {
  try {
    const data = await Order.find().populate("items.productId");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const orderById = async (id) => {
  try {
    const data = await Order.findById(id).populate("items.productId");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const create = async (order) => {
  try {
    const productIds = order.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    let calculatedTotal = 0;
    const verifiedItems = order.items.map((item) => {
      const realProduct = products.find(
        (p) => p._id.toString() === item.productId.toString(),
      );
      calculatedTotal += realProduct.price * item.quantity;

      return {
        ...item,
        price: realProduct.price,
        name: realProduct.name,
        image: realProduct.image,
      };
    });

    const deliveryCharge = calculatedTotal > 999 ? 0 : 499;
    calculatedTotal += deliveryCharge;

    const saved = await Order.create({
      ...order,
      items: verifiedItems,
      totalAmount: calculatedTotal,
      deliveryCharge,
    });
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const remove = async (id) => {
  try {
    const deleted = await Order.findByIdAndDelete(id);
    return ok(deleted);
  } catch (error) {
    return err(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const { data, error } = await orders();
    if (error) {
      console.log("Error fetching orders", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ orders: data }, "Orders fetched"));
  } catch (error) {
    console.log("Error at controller: getOrders", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await orderById(id);
    if (error) {
      console.log("Error fetching order", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Order not found"));
    }
    res.status(200).json(success({ order: data }, "Order fetched"));
  } catch (error) {
    console.log("Error at controller: getOrder", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addOrder = async (req, res) => {
  const { items, totalAmount, deliveryCharge, address } = req.body;
  try {
    const { data, error } = await create({
      items,
      totalAmount,
      deliveryCharge,
      address,
    });
    if (error) {
      console.log("Error placing order", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(201).json(success({ order: data }, "Order placed"));
  } catch (error) {
    console.log("Error at controller: addOrder", error);
    res.status(500).json(failure("Internal server error"));
  }
};

// DELETE "/" — frontend sends orderId in body (no /:id in the route required)
const deleteOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const { data, error } = await remove(orderId);
    if (error) {
      console.log("Error deleting order", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Order not found"));
    }
    res.status(200).json(success({ order: data }, "Order deleted"));
  } catch (error) {
    console.log("Error at controller: deleteOrder", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = { getOrders, getOrder, addOrder, deleteOrder };
