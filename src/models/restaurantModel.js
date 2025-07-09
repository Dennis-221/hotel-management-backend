const db = require("../config/database");

exports.getMenu = (filters = {}) => {
  let query = `SELECT * FROM menu_items WHERE 1=1`;
  const params = [];

  if (filters.category) {
    query += " AND category = ?";
    params.push(filters.category);
  }
  if (filters.available !== undefined) {
    query += " AND available = ?";
    params.push(filters.available ? 1 : 0);
  }
  if (filters.vegetarian !== undefined) {
    query += " AND description LIKE ?";
    params.push(filters.vegetarian ? "%veg%" : "%");
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.createOrder = ({ roomId, items, totalAmount, deliveryTime }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO restaurant_orders (roomId, items, totalAmount, status, createdAt)
      VALUES (?, ?, ?, 'preparing', datetime('now'))
    `;
    db.run(sql, [roomId, JSON.stringify(items), totalAmount], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM restaurant_orders ORDER BY createdAt DESC
    `;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.updateOrderStatus = (orderId, status) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE restaurant_orders SET status = ? WHERE id = ?
    `;
    db.run(sql, [status, orderId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
