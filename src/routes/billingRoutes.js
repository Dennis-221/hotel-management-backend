const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Staff only
router.get("/:bookingId", verifyStaffToken, billingController.getBill);
router.post(
  "/payment",
  verifyStaffToken,
  requireFields("billId", "paymentMethod", "paidAmount"),
  billingController.processPayment
);

module.exports = router;
