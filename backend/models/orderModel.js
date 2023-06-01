//Import order,user and product moduels
const Order = require("../schemas/orderSchema");
const User = require("../schemas/userSchema");
const Product = require("../schemas/productSchema");

//Create a new order if the user is logged in
const createNewOrder = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orderLines = req.body.orderLines;

    let totalPrice = 0;
    for (const orderLine of orderLines) {
      const product = await Product.findById(orderLine.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${orderLine.product}`,
        });
      }
      if (orderLine.quantity <= 0 || orderLine.quantity > product.quantity) {
        return res.status(400).json({
          message: `Invalid quantity for product: ${product.name}`,
        });
      }

      totalPrice += orderLine.quantity * product.price;
    }

    const newOrder = new Order({
      user: user._id,
      orderLines: orderLines,
      totalPrice: totalPrice,
    });

    const savedOrder = await newOrder.save();

    if (user.orders) {
      user.orders.push(savedOrder._id);
    } else {
      user.orders = [savedOrder._id];
    }
    await user.save();

    return res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating order",
    });
  }
};

//Get all orders for a specific user
const getOrdersByUser = async (req, res) => {
  console.log(req);
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId }).populate({
      path: "orderLines.product",
      select: "name price _id imgURL",
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting orders",
    });
  }
};

//Get all orders for a specific user
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate({
      path: "orderLines.product user",
      select: "name price _id email",
    });
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting orders",
    });
  }
};

//PUT
const updateOrder = async (req, res) => {
  const { pending } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { pending },
      { new: true }
    );

    if (!updatedOrder) {
      res
        .status(404)
        .json({ message: "Could not find any product with this id" });
      return;
    }
    res.status(201).json(updatedOrder);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while update the order",
      err: err.message,
    });
  }
};

//Get all details of a single product
const getSingleOrder = async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);

    if (!singleOrder) {
      res.status(404).json({
        message: "Could not find that order",
      });
      return;
    }
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(500).json({
      message: "Error when trying to get that order",
    });
  }
};

//Export modules
module.exports = {
  createNewOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrder,
  getSingleOrder,
};
