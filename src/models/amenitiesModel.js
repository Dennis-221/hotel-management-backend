const db = require("../config/database");

exports.checkSpaAvailability = (date, time) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM spa_bookings 
      WHERE date = ? AND time = ? AND status = 'booked'
    `;
    db.all(sql, [date, time], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.bookSpaAppointment = ({
  roomId,
  service,
  date,
  time,
  duration,
  therapistPreference,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO spa_bookings (roomId, service, date, time, duration, therapistPreference, status)
      VALUES (?, ?, ?, ?, ?, ?, 'booked')
    `;
    db.run(
      sql,
      [roomId, service, date, time, duration, therapistPreference],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};
