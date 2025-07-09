const db = require("../config/database");

exports.getInventoryItems = (filters = {}) => {
  let query = `SELECT * FROM inventory WHERE 1=1`;
  const params = [];

  if (filters.category) {
    query += " AND category = ?";
    params.push(filters.category);
  }
  if (filters.lowStock === "true") {
    query += " AND currentStock <= reorderPoint";
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.recordUsage = (itemId, quantityUsed) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE inventory SET currentStock = currentStock - ? WHERE id = ?
    `;
    db.run(sql, [quantityUsed, itemId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
