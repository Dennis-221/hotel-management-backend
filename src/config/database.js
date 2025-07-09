const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the database path
const dbPath = path.resolve(__dirname, "../../database/hotel.db");

// Create the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err.message);
  } else {
    console.log("✅ Connected to the SQLite database at", dbPath);
  }
});

// Enable foreign key constraints
db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;", (err) => {
    if (err) {
      console.error("❌ Failed to enable foreign keys:", err.message);
    } else {
      console.log("✅ Foreign keys enabled.");
    }
  });
});

module.exports = db;
