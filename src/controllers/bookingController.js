const bookingModel = require("../models/bookingModel");

exports.createBooking = async (req, res, next) => {
  try {
    const { guestId, roomId, checkInDate, checkOutDate, specialRequests } =
      req.body;
    if (!guestId || !roomId || !checkInDate || !checkOutDate) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const booking = await bookingModel.createBooking({
      guestId,
      roomId,
      checkInDate,
      checkOutDate,
      specialRequests,
    });
    res.status(201).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    console.log(`[INFO] Staff ID ${req.user.id} accessed all bookings`);
    const bookings = await bookingModel.getAllBookings(req.query);
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.checkIn = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const { roomNumber, actualArrivalTime, idVerified } = req.body;
    if (!idVerified) {
      return res
        .status(400)
        .json({ success: false, message: "ID verification required" });
    }
    await bookingModel.processCheckIn(
      bookingId,
      roomNumber,
      actualArrivalTime,
      idVerified
    );
    res.json({ success: true, message: "Check-in processed" });
  } catch (err) {
    next(err);
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    await bookingModel.processCheckOut(bookingId);
    res.json({ success: true, message: "Check-out processed" });
  } catch (err) {
    next(err);
  }
};
