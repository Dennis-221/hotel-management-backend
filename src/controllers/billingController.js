const billingModel = require("../models/billingModel");

exports.getBill = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const bill = await billingModel.getBillByBookingId(bookingId);
    if (!bill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }
    res.json({ success: true, bill });
  } catch (err) {
    next(err);
  }
};

exports.processPayment = async (req, res, next) => {
  try {
    const staffId = req.user.id;
    const { billId, paymentMethod, paidAmount } = req.body;

    console.log(
      `[AUDIT] Staff ID ${staffId} processed payment for bill ${billId}`
    );

    const result = await billingModel.processPayment(
      billId,
      paymentMethod,
      paidAmount
    );
    res.json({ success: true, message: "Payment processed", result });
  } catch (err) {
    next(err);
  }
};
