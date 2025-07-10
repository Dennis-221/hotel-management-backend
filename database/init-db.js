const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "hotel.db");
const schemaFile = path.join(__dirname, "schema.sql");
const seedsFile = path.join(__dirname, "seeds.sql");

const db = new sqlite3.Database(dbFile);

function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, "utf8");
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

(async () => {
  try {
    console.log("Initializing database...");
    await runSqlFile(schemaFile);
    console.log("Schema applied.");
    await runSqlFile(seedsFile);
    console.log("Seeds inserted.");
    console.log("Database initialization complete!");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    db.close();
  }
})();
