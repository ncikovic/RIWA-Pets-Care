const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "kblazevic",
  password: "11",
  database: "kblazevic",
});

app.use(express.urlencoded({ extended: true }));

/*
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

// Dohvaćanje svih ljubimaca
app.get("/api/pets", (req, res) => {
  connection.query("SELECT * FROM Ljubimac", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
  /*
      REQUEST - slanje zahtjeva s klijentske strane
      RESPONSE - slanje odgovora sa serverske strane
  
      npm install -g nodemon
    */
  res.send("popis_ljubimaca");
});

// Dohvaćanje jednog ljubimca prema ID-u
app.get("/api/pets/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Ljubimac WHERE id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]); // Pretpostavljamo da vraćamo samo jednog ljubimca
    }
  );
});

// Dohvaćanje svih veterinara
app.get("/api/veterinarians", (req, res) => {
  connection.query("SELECT * FROM Veterinar", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
  res.send("popis_veterinara");
});

// Dohvaćanje jednog veterinara prema ID-u
app.get("/api/veterinarians/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Veterinar WHERE id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]); // Pretpostavljamo da vraćamo samo jednog veterinara
    }
  );
});

// Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
