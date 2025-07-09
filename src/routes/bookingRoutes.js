const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Public booking creation
router.post(
  "/create",
  requireFields("guestId", "roomId", "checkInDate", "checkOutDate"),
  bookingController.createBooking
);

// Staff view
router.get("/", verifyStaffToken, bookingController.getAllBookings);

// Staff check-in/out
router.put("/:bookingId/checkin", verifyStaffToken, bookingController.checkIn);
router.put(
  "/:bookingId/checkout",
  verifyStaffToken,
  bookingController.checkOut
);

module.exports = router;
