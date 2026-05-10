const express = require("express");
const path = require("path");
const db = require("./db/db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index8.html"));
});

app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Wszystkie pola formularza są wymagane.",
    });
  }

  const createdAt = new Date().toISOString();

  db.run(
    `
    INSERT INTO messages (firstName, lastName, email, message, createdAt)
    VALUES (?, ?, ?, ?, ?)
    `,
    [firstName, lastName, email, message, createdAt],
    function (error) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Błąd zapisu wiadomości do bazy danych.",
        });
      }

      res.json({
        success: true,
        message: "Wiadomość została zapisana w bazie danych.",
        id: this.lastID,
      });
    },
  );
});

app.get("/api/projects", (req, res) => {
  db.all("SELECT * FROM projects ORDER BY id DESC", [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Błąd pobierania projektów.",
      });
    }

    res.json(rows);
  });
});

app.post("/api/projects", (req, res) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res.status(400).json({
      success: false,
      message: "Nazwa projektu i link są wymagane.",
    });
  }

  const createdAt = new Date().toISOString();

  db.run(
    `
    INSERT INTO projects (name, link, createdAt)
    VALUES (?, ?, ?)
    `,
    [name, link, createdAt],
    function (error) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Błąd zapisu projektu do bazy danych.",
        });
      }

      res.json({
        success: true,
        message: "Projekt został zapisany w bazie danych.",
        project: {
          id: this.lastID,
          name,
          link,
          createdAt,
        },
      });
    },
  );
});

app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM projects WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Błąd usuwania projektu.",
      });
    }

    res.json({
      success: true,
      message: "Projekt został usunięty.",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
