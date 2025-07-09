const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleCheck");

// Manager/Admin only
router.get(
  "/occupancy",
  verifyStaffToken,
  requireRole("Manager", "Admin"),
  reportsController.getOccupancyReport
);
router.get(
  "/revenue",
  verifyStaffToken,
  requireRole("Manager", "Admin"),
  reportsController.getRevenueReport
);
router.get(
  "/guest-satisfaction",
  verifyStaffToken,
  requireRole("Manager", "Admin"),
  reportsController.getGuestSatisfactionReport
);

module.exports = router;
