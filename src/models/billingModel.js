const db = require("../config/database");

exports.getBillByBookingId = (bookingId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM bills WHERE bookingId = ?
    `;
    db.get(sql, [bookingId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.processPayment = (billId, paymentMethod, paidAmount) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE bills SET paymentStatus = 'paid' WHERE id = ?
    `;
    db.run(sql, [billId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
