const db = require("../config/database");

exports.createRequest = ({ roomId, type, priority, description }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO requests (roomId, type, priority, description, status)
      VALUES (?, ?, ?, ?, 'open')
    `;
    db.run(sql, [roomId, type, priority, description], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

exports.getAllRequests = (filters = {}) => {
  let query = `SELECT requests.*, rooms.roomNumber FROM requests LEFT JOIN rooms ON requests.roomId = rooms.id WHERE 1=1`;
  const params = [];

  if (filters.status) {
    query += " AND requests.status = ?";
    params.push(filters.status);
  }
  if (filters.priority) {
    query += " AND requests.priority = ?";
    params.push(filters.priority);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.resolveRequest = (requestId, resolution) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE requests
      SET status = 'resolved', resolution = ?
      WHERE id = ?
    `;
    db.run(sql, [resolution, requestId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
