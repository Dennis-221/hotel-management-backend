const roomModel = require("../models/roomModel");

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.getAllRooms(req.query);
    res.json({ success: true, rooms });
  } catch (err) {
    next(err);
  }
};

exports.checkAvailability = async (req, res, next) => {
  try {
    const { checkIn, checkOut, roomType } = req.query;
    const availableRooms = await roomModel.checkAvailability(
      checkIn,
      checkOut,
      roomType
    );
    res.json({ success: true, availableRooms });
  } catch (err) {
    next(err);
  }
};

exports.updateRoomStatus = async (req, res, next) => {
  try {
    const { status, reason, expectedAvailableDate } = req.body;
    const roomId = req.params.roomId;
    const result = await roomModel.updateRoomStatus(
      roomId,
      status,
      reason,
      expectedAvailableDate
    );
    res.json({ success: true, message: "Room status updated", result });
  } catch (err) {
    next(err);
  }
};
