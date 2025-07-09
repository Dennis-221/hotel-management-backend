const express = require("express");
const router = express.Router();
const amenitiesController = require("../controllers/amenitiesController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Public
router.get("/spa/availability", amenitiesController.checkSpaAvailability);

// Guest booking
router.post(
  "/spa/book",
  requireFields("roomId", "service", "date", "time", "duration"),
  amenitiesController.bookSpaAppointment
);

module.exports = router;
