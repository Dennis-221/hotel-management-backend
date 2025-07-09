const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// GET /api/staff/schedule
router.get("/schedule", staffController.getSchedule);

// POST /api/staff/attendance
router.post("/attendance", staffController.markAttendance);

module.exports = router;
