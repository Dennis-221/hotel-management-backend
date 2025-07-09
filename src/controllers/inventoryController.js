const inventoryModel = require("../models/inventoryModel");

exports.getInventory = async (req, res, next) => {
  try {
    const items = await inventoryModel.getInventoryItems(req.query);
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

exports.recordUsage = async (req, res, next) => {
  try {
    const { itemId, quantityUsed } = req.body;
    if (!itemId || !quantityUsed) {
      return res
        .status(400)
        .json({ success: false, message: "Missing usage details" });
    }
    const result = await inventoryModel.recordUsage(itemId, quantityUsed);
    res.json({ success: true, message: "Usage recorded", result });
  } catch (err) {
    next(err);
  }
};
