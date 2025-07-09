const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Public menu
router.get("/menu", restaurantController.getMenu);

// Guest order
router.post(
  "/order",
  requireFields("roomId", "items", "totalAmount"),
  restaurantController.createOrder
);

// Staff only
router.get("/orders", verifyStaffToken, restaurantController.getAllOrders);
router.put(
  "/orders/:orderId/status",
  verifyStaffToken,
  restaurantController.updateOrderStatus
);

module.exports = router;
