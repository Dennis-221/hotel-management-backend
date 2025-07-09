const db = require("../config/database");

exports.getOccupancyReport = () => {
  const sql = `
    SELECT 
      COUNT(*) AS totalRooms,
      SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) AS occupied,
      SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) AS available,
      ROUND(100.0 * SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) / COUNT(*), 2) AS occupancyRate
    FROM rooms
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.getRevenueReport = () => {
  const sql = `
    SELECT 
      SUM(totalAmount) AS totalRevenue,
      COUNT(*) AS totalBills
    FROM bills
    WHERE paymentStatus = 'paid'
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.getGuestSatisfactionReport = () => {
  const sql = `
    SELECT 
      COUNT(*) AS totalRequests,
      SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,
      ROUND(100.0 * SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS resolutionRate
    FROM requests
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
