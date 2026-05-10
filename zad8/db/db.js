const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("Błąd połączenia z bazą:", error.message);
  } else {
    console.log("Połączono z SQLite.");
    console.log("Ścieżka bazy:", dbPath);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      link TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;