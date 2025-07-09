const db = require("../config/database");

exports.getStaffByEmployeeId = (employeeId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM staff WHERE employeeId = ?";
    db.get(sql, [employeeId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.createGuest = async ({
  firstName,
  lastName,
  email,
  phone,
  passwordHash,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO guests (firstName, lastName, email, phone, passwordHash)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [firstName, lastName, email, phone, passwordHash],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};
