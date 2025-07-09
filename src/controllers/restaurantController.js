const restaurantModel = require("../models/restaurantModel");

exports.getMenu = async (req, res, next) => {
  try {
    const menu = await restaurantModel.getMenu(req.query);
    res.json({ success: true, menu });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { roomId, items, totalAmount, deliveryTime } = req.body;
    if (!roomId || !items || !totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const order = await restaurantModel.createOrder({
      roomId,
      items,
      totalAmount,
      deliveryTime,
    });
    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await restaurantModel.getAllOrders();
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const result = await restaurantModel.updateOrderStatus(orderId, status);
    res.json({ success: true, message: "Order status updated", result });
  } catch (err) {
    next(err);
  }
};
