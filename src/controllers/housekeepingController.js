const housekeepingModel = require("../models/housekeepingModel");

exports.getSchedule = async (req, res, next) => {
  try {
    const schedule = await housekeepingModel.getSchedule(req.query);
    res.json({ success: true, schedule });
  } catch (err) {
    next(err);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    const { roomId, type, items, preferredTime } = req.body;
    if (!roomId || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const task = await housekeepingModel.createRequest({
      roomId,
      type,
      items,
      preferredTime,
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const staffId = req.user.id;

    console.log(
      `[INFO] Staff ID ${staffId} is updating housekeeping task ${taskId}`
    );

    await housekeepingModel.updateStatus(taskId, req.body.status);
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    next(err);
  }
};
