const staffModel = require("../models/staffModel");

exports.getSchedule = async (req, res, next) => {
  try {
    const staffList = await staffModel.getStaffSchedule(req.query);
    res.json({ success: true, staff: staffList });
  } catch (err) {
    next(err);
  }
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { staffId, date, shift, status } = req.body;
    if (!staffId || !date || !shift || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const result = await staffModel.markAttendance({
      staffId,
      date,
      shift,
      status,
    });
    res
      .status(201)
      .json({ success: true, message: "Attendance marked", result });
  } catch (err) {
    next(err);
  }
};
