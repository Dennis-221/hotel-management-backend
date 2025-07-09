const amenitiesModel = require("../models/amenitiesModel");

exports.checkSpaAvailability = async (req, res, next) => {
  try {
    const { date, time } = req.query;
    if (!date || !time) {
      return res
        .status(400)
        .json({ success: false, message: "Date and time are required" });
    }
    const bookings = await amenitiesModel.checkSpaAvailability(date, time);
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.bookSpaAppointment = async (req, res, next) => {
  try {
    const { roomId, service, date, time, duration, therapistPreference } =
      req.body;
    if (!roomId || !service || !date || !time || !duration) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const appointment = await amenitiesModel.bookSpaAppointment({
      roomId,
      service,
      date,
      time,
      duration,
      therapistPreference,
    });
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    next(err);
  }
};
