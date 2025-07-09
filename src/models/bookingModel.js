const db = require("../config/database");

exports.createBooking = ({
  guestId,
  roomId,
  checkInDate,
  checkOutDate,
  specialRequests,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO bookings (guestId, roomId, checkInDate, checkOutDate, status, specialRequests, paymentStatus)
      VALUES (?, ?, ?, ?, 'confirmed', ?, 'unpaid')
    `;
    db.run(
      sql,
      [guestId, roomId, checkInDate, checkOutDate, specialRequests],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

exports.getAllBookings = (filters = {}) => {
  let query = `
    SELECT bookings.*, guests.firstName || ' ' || guests.lastName AS guestName,
           rooms.roomNumber
    FROM bookings
    JOIN guests ON bookings.guestId = guests.id
    JOIN rooms ON bookings.roomId = rooms.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.status) {
    query += " AND bookings.status = ?";
    params.push(filters.status);
  }
  if (filters.date) {
    query += " AND bookings.checkInDate <= ? AND bookings.checkOutDate >= ?";
    params.push(filters.date, filters.date);
  }
  if (filters.guestName) {
    query += ' AND (guests.firstName || " " || guests.lastName) LIKE ?';
    params.push(`%${filters.guestName}%`);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.updateStatus = (bookingId, newStatus) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE bookings SET status = ? WHERE id = ?`;
    db.run(sql, [newStatus, bookingId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};

exports.processCheckIn = (
  bookingId,
  roomNumber,
  actualArrivalTime,
  idVerified
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE bookings
      SET status = 'active'
      WHERE id = ?
    `;
    db.run(sql, [bookingId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};

exports.processCheckOut = (bookingId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE bookings
      SET status = 'completed'
      WHERE id = ?
    `;
    db.run(sql, [bookingId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
