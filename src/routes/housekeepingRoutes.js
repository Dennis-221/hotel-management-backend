const express = require("express");
const router = express.Router();
const housekeepingController = require("../controllers/housekeepingController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Staff only
router.get("/schedule", verifyStaffToken, housekeepingController.getSchedule);

router.post(
  "/request",
  verifyStaffToken,
  requireFields("roomId", "type"),
  housekeepingController.createRequest
);

router.put(
  "/:taskId/status",
  verifyStaffToken,
  housekeepingController.updateStatus
);

module.exports = router;
