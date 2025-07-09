const db = require("../config/database");

exports.getStaffSchedule = (filters = {}) => {
  let query = `
    SELECT id, name, department, role, shift 
    FROM staff 
    WHERE 1=1
  `;
  const params = [];

  if (filters.role) {
    query += " AND role = ?";
    params.push(filters.role);
  }
  if (filters.department) {
    query += " AND department = ?";
    params.push(filters.department);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.markAttendance = ({ staffId, date, shift, status }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO attendance (staffId, date, shift, status)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [staffId, date, shift, status], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};
