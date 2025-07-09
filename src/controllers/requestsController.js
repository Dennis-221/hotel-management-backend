const requestsModel = require("../models/requestsModel");

exports.createRequest = async (req, res, next) => {
  try {
    const { roomId, type, priority, description } = req.body;
    if (!roomId || !type || !priority || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const request = await requestsModel.createRequest({
      roomId,
      type,
      priority,
      description,
    });
    res.status(201).json({ success: true, request });
  } catch (err) {
    next(err);
  }
};

exports.getAllRequests = async (req, res, next) => {
  try {
    console.log(`[INFO] User ${req.user.employeeId} is viewing all requests`);
    const requests = await requestsModel.getAllRequests(req.query);
    res.json({ success: true, requests });
  } catch (err) {
    next(err);
  }
};

exports.resolveRequest = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    const { resolution } = req.body;
    if (!resolution) {
      return res
        .status(400)
        .json({ success: false, message: "Resolution text required" });
    }
    const result = await requestsModel.resolveRequest(requestId, resolution);
    res.json({ success: true, message: "Request resolved", result });
  } catch (err) {
    next(err);
  }
};
