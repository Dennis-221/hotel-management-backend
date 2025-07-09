const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleCheck");

// Staff only
router.get(
  "/:guestId",
  verifyStaffToken,
  requireRole("Manager", "Admin", "Staff"),
  guestController.getGuestById
);
router.put(
  "/:guestId/preferences",
  verifyStaffToken,
  guestController.updatePreferences
);
router.get(
  "/:guestId/history",
  verifyStaffToken,
  guestController.getStayHistory
);

module.exports = router;
