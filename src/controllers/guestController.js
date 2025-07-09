const guestModel = require("../models/guestModel");

exports.getGuestById = async (req, res, next) => {
  try {
    const guestId = req.params.guestId;
    const guest = await guestModel.getGuestById(guestId);
    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Guest not found" });
    }
    let preferences = guest.preferences ? JSON.parse(guest.preferences) : {};
    res.json({ success: true, guest: { ...guest, preferences } });
  } catch (err) {
    next(err);
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const guestId = req.params.guestId;
    const preferences = req.body;
    const result = await guestModel.updatePreferences(guestId, preferences);
    res.json({ success: true, message: "Preferences updated", result });
  } catch (err) {
    next(err);
  }
};

exports.getStayHistory = async (req, res, next) => {
  try {
    const guestId = req.params.guestId;
    const history = await guestModel.getStayHistory(guestId);
    res.json({ success: true, history });
  } catch (err) {
    next(err);
  }
};
