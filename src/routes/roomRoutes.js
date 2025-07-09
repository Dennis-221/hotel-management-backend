const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleCheck");

// Public
router.get("/", roomController.getAllRooms);
router.get("/availability", roomController.checkAvailability);

// Staff only
router.put(
  "/:roomId/status",
  verifyStaffToken,
  requireRole("Manager", "Admin", "Staff"),
  roomController.updateRoomStatus
);

module.exports = router;
