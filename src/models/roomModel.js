const db = require("../config/database");

exports.getAllRooms = (filters = {}) => {
  let query = `SELECT rooms.*, room_types.category, room_types.amenities AS typeAmenities 
               FROM rooms 
               JOIN room_types ON rooms.typeId = room_types.id WHERE 1=1`;
  const params = [];

  if (filters.status) {
    query += " AND rooms.status = ?";
    params.push(filters.status);
  }
  if (filters.type) {
    query += " AND room_types.category = ?";
    params.push(filters.type);
  }
  if (filters.floor) {
    query += " AND rooms.floor = ?";
    params.push(filters.floor);
  }
  if (filters.priceMin) {
    query += " AND rooms.pricePerNight >= ?";
    params.push(filters.priceMin);
  }
  if (filters.priceMax) {
    query += " AND rooms.pricePerNight <= ?";
    params.push(filters.priceMax);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.checkAvailability = (checkIn, checkOut, roomType) => {
  let query = `
    SELECT rooms.*
    FROM rooms
    JOIN room_types ON rooms.typeId = room_types.id
    WHERE rooms.status = 'available'
  `;
  const params = [];

  if (roomType) {
    query += " AND room_types.category = ?";
    params.push(roomType);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.updateRoomStatus = (roomId, status, reason, expectedDate) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE rooms SET status = ? WHERE id = ?`;
    db.run(sql, [status, roomId], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
