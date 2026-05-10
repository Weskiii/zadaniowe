const db = require("./db");

console.log("=== BAZA DANYCH SQLITE ===");

db.all("SELECT * FROM messages", [], (error, rows) => {
  if (error) {
    console.error("Błąd:", error.message);
    return;
  }

  console.log("\nWIADOMOŚCI:");
  console.table(rows);

  db.all("SELECT * FROM projects", [], (error, projects) => {
    if (error) {
      console.error("Błąd:", error.message);
      return;
    }

    console.log("\nPROJEKTY:");
    console.table(projects);

    db.close();
  });
});