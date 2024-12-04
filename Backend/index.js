const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mysql = require("mysql");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

app.use(express.urlencoded({ extended: true }));

/*
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

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
  const SIFRA_LJUBIMCA = req.params.SIFRA_LJUBIMCA;
  connection.query(
    "SELECT * FROM Ljubimac WHERE SIFRA_LJUBIMCA = ?",
    [SIFRA_LJUBIMCA],
    (error, results) => {
      if (error) throw error;
      res.send(results); // Pretpostavljamo da vraćamo samo jednog ljubimca
    }
  );
});

// Dohvaćanje svih veterinara
app.get("/api/veterinarians", (req, res) => {
  connection.query("SELECT * FROM Veterinar", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
  //res.send("popis_veterinara");
});

// Dohvaćanje jednog veterinara prema ID-u
app.get("/api/veterinarians/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Veterinar WHERE SIFRA_VETERINARA = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]); // Pretpostavljamo da vraćamo samo jednog veterinara
    }
  );
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM Korisnik", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 2. GET: Lista ljubimaca po vrsti životinje
app.get("/api/pets/:vrsta_zivotinje", (req, res) => {
  const vrsta_zivotinje = req.params.vrsta_zivotinje;
  connection.query(
    "SELECT Ljubimac.* FROM Ljubimac JOIN Zivotinja ON Ljubimac.SIFRA_ZIVOTINJA = Zivotinja.SIFRA_ZIVOTINJA WHERE Zivotinja.vrsta_zivotinje = ?",
    [vrsta_zivotinje],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

// 3. GET: Lista svih događaja
app.get("/api/dogadaji", (req, res) => {
  connection.query("SELECT * FROM Dogadaji", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 4. GET: Lista događaja po mjestu događaja
app.get("/api/dogadaji/:mjesto_dogadaja", (req, res) => {
  const mjesto_dogadaja = req.params.mjesto_dogadaja;
  connection.query(
    "SELECT * FROM Dogadaji WHERE mjesto_dogadaja = ?",
    [mjesto_dogadaja],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

// 5. PUT: Ažuriranje podataka o jednom korisniku
app.put("/api/users/:SIFRA_KORISNIKA", (req, res) => {
  const SIFRA_KORISNIKA = req.params.SIFRA_KORISNIKA;
  const {
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
    mjesto_stanovanja,
    adresa_korisnika,
  } = req.body;
  connection.query(
    "UPDATE Korisnik SET ime_korisnika = ?, prezime_korisnika =?, broj_telefona_korisnika=?, email_korisnika = ?, mjesto_stanovanja = ?, adresa_korisnika =? WHERE SIFRA_KORISNIKA = ?",
    [
      ime_korisnika,
      prezime_korisnika,
      broj_telefona_korisnika,
      email_korisnika,
      mjesto_stanovanja,
      adresa_korisnika,
      SIFRA_KORISNIKA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Korisnik uspješno ažuriran!" });
    }
  );
});

// 6. PUT: Ažuriranje podataka o jednom ljubimcu
app.put("/api/pets/:SIFRA_LJUBIMCA", (req, res) => {
  const SIFRA_LJUBIMCA = req.params.SIFRA_LJUBIMCA;
  const {
    ime_ljubimca,
    kilaza_ljubimca,
    podaci_o_njezi_ljubimca,
    podaci_o_prehrani_ljubimca,
  } = req.body;
  connection.query(
    "UPDATE Ljubimac SET ime_ljubimca = ?, kilaza_ljubimca = ?, podaci_o_njezi_ljubimca = ?, podaci_o_prehrani_ljubimca = ? WHERE SIFRA_LJUBIMCA = ?",
    [
      ime_ljubimca,
      kilaza_ljubimca,
      podaci_o_njezi_ljubimca,
      podaci_o_prehrani_ljubimca,
      SIFRA_LJUBIMCA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Ljubimac je uspješno ažuriran!" });
    }
  );
});

// 7. PUT: Ažuriranje podataka o jednom događaju
app.put("/api/dogadaji/:id", (req, res) => {
  const { SIFRA_DOGADAJA } = req.params.SIFRA_DOGADAJA;
  const {
    naziv_dogadaja,
    mjesto_dogadaja,
    adresa_dogadaja,
    datum_dogadaja,
    vrijeme_dogadaja,
  } = req.body;
  const query =
    "UPDATE Dogadaji SET naziv_dogadaja = ?, mjesto_dogadaja = ?, adresa_dogadaja = ?, datum_dogadaja = ?, vrijeme_dogadaja = ? WHERE SIFRA_DOGADAJA = ?";
  connection.query(
    query,
    [
      naziv_dogadaja,
      mjesto_dogadaja,
      adresa_dogadaja,
      datum_dogadaja,
      vrijeme_dogadaja,
      SIFRA_DOGADAJAIFRA_DOGADAJA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Događaj je uspješno ažuriran.");
    }
  );
});

// 8. PUT: Ažuriranje podataka o jednom veterinaru
app.put("/api/veterinarians/:id", (req, res) => {
  const { ŠIFRA_VETERINARA } = req.params;
  const {
    ime_veterinara,
    prezime_veterinara,
    kontakt_veterinara,
    email_veterinara,
    lokacija_veterinara,
    specijalizacija_veterinara,
  } = req.body;
  const query =
    "UPDATE Veterinar SET ime_veterinara = ?, prezime_veterinara = ?, kontakt_veterinara = ?, email_veterinara = ?, lokacija_veterinara = ?, specijalizacija_veterinara = ? WHERE SIFRA_VETERINARA = ?";
  connection.query(
    query,
    [
      ime_veterinara,
      prezime_veterinara,
      kontakt_veterinara,
      email_veterinara,
      lokacija_veterinara,
      specijalizacija_veterinara,
      ŠIFRA_VETERINARA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Veterinar je uspješno ažuriran.");
    }
  );
});

// 9. DELETE: Brisanje lijeka za određenu bolest iz zdravstvenog kartona
app.delete("/api/zdravstveniKarton/:vrsta_bolesti_ljubimca", (req, res) => {
  const vrsta_bolesti_ljubimca = req.params.vrsta_bolesti_ljubimca;
  connection.query(
    "DELETE FROM ZdravstveniKarton WHERE vrsta_bolesti_ljubimca = ?",
    [vrsta_bolesti_ljubimca],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Bolest je obrisana iz zdravstvenog kartona!" });
    }
  );
});

// 10. POST: Dodavanje u zdravstveni karton
app.post("/api/zdravstveniKarton", (req, res) => {
  const {
    simptomi_ljubimca,
    vrijeme_datum_pojave_simptoma_ljubimca,
    naziv_bolesti_ljubimnca,
    vrsta_bolesti_ljubimca,
  } = req.body;
  const query =
    "INSERT INTO ZdravstveniKarton (simptomi_ljubimca, vrijeme_datum_pojave_simptoma_ljubimca,naziv_bolesti_ljubimnca, vrsta_bolesti_ljubimca) VALUES (?, ?, ?, ?, NULL)";
  connection.query(
    query,
    [
      simptomi_ljubimca,
      vrijeme_datum_pojave_simptoma_ljubimca,
      naziv_bolesti_ljubimnca,
      vrsta_bolesti_ljubimca,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Zdravstveni obrazac dodan.");
    }
  );
});

/*Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
