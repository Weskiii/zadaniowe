const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (error) => {
  if (error) {
    console.error("Błąd połączenia z bazą danych:", error.message);
  } else {
    console.log("Połączono z bazą danych SQLite.");
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