const reportsModel = require("../models/reportsModel");

exports.getOccupancyReport = async (req, res, next) => {
  try {
    const data = await reportsModel.getOccupancyReport();
    res.json({ success: true, report: data });
  } catch (err) {
    next(err);
  }
};

exports.getRevenueReport = async (req, res, next) => {
  try {
    const data = await reportsModel.getRevenueReport();
    res.json({ success: true, report: data });
  } catch (err) {
    next(err);
  }
};

exports.getGuestSatisfactionReport = async (req, res, next) => {
  try {
    const data = await reportsModel.getGuestSatisfactionReport();
    res.json({ success: true, report: data });
  } catch (err) {
    next(err);
  }
};
