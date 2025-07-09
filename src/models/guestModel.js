const db = require("../config/database");

exports.getGuestById = (guestId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM guests WHERE id = ?`;
    db.get(sql, [guestId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.updatePreferences = (guestId, preferences) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE guests SET preferences = ? WHERE id = ?`;
    db.run(sql, [JSON.stringify(preferences), guestId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};

exports.getStayHistory = (guestId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT bookings.*, rooms.roomNumber
      FROM bookings
      JOIN rooms ON bookings.roomId = rooms.id
      WHERE bookings.guestId = ?
      ORDER BY bookings.checkInDate DESC
    `;
    db.all(sql, [guestId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
