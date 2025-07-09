const db = require("../config/database");

exports.getSchedule = (filters = {}) => {
  let query = `
    SELECT housekeeping.*, rooms.roomNumber, staff.name AS assignedStaff
    FROM housekeeping
    LEFT JOIN rooms ON housekeeping.roomId = rooms.id
    LEFT JOIN staff ON housekeeping.assignedStaffId = staff.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.date) {
    query += " AND housekeeping.scheduledDate = ?";
    params.push(filters.date);
  }
  if (filters.floor) {
    query += " AND rooms.floor = ?";
    params.push(filters.floor);
  }
  if (filters.status) {
    query += " AND housekeeping.status = ?";
    params.push(filters.status);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.createRequest = ({ roomId, type, items, preferredTime }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO housekeeping (roomId, type, scheduledDate, status, specialInstructions)
      VALUES (?, ?, DATE('now'), 'pending', ?)
    `;
    const instructions = JSON.stringify({ items, preferredTime });
    db.run(sql, [roomId, type, instructions], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

exports.updateStatus = (taskId, status, completedAt, notes) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE housekeeping
      SET status = ?, specialInstructions = ?
      WHERE id = ?
    `;
    const updatedInstructions = JSON.stringify({ completedAt, notes });
    db.run(sql, [status, updatedInstructions, taskId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
