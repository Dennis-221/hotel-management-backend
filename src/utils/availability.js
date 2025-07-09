const db = require("../config/database");

exports.isRoomAvailable = (roomId, checkIn, checkOut) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM bookings
      WHERE roomId = ?
      AND (
        (checkInDate <= ? AND checkOutDate > ?) OR
        (checkInDate < ? AND checkOutDate >= ?)
      )
      AND status IN ('confirmed', 'active')
    `;
    db.all(sql, [roomId, checkIn, checkIn, checkOut, checkOut], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.length === 0);
    });
  });
};
