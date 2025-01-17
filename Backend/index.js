const express = require("express");
const session = require("express-session"); // Dodano za upravljanje sesijama
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());

// Konfiguracija sesija
app.use(
  session({
    secret: "tajnaSesija",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Postaviti na true ako se koristi HTTPS
  })
);

// Parser za JSON podatke
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "kblazevic",
  password: "11",
  database: "kblazevic",
});

app.use(express.urlencoded({ extended: true }));

// Pokretanje servera
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

app.get("/moji-ljubimci", (req, res) => {
  if (!req.session.korisnik) {
    return res.status(401).json({ error: "Niste prijavljeni" });
  }
  
  const SIFRA_KORISNIKA = req.session.korisnik.SIFRA_KORISNIKA;
  connection.query(
    "SELECT * FROM LJUBIMCI WHERE SIFRA_KORISNIKA = ?",
    [SIFRA_KORISNIKA],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Greška pri dohvaćanju podataka" });
      }
      res.json(results);
    }
  );
});

app.get("/api/veterinar", (req, res) => {
  const sql = "SELECT * FROM Veterinar";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Dohvati jednog veterinara po ID-u
app.get("/api/veterinar/:id", (req, res) => {
  const sql = "SELECT * FROM Veterinar WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Veterinar nije pronađen" });
    res.json(results[0]);
  });
});

//Dodaj novog veterinara
app.post("/api/veterinar", (req, res) => {
  const {
    ime_veterinara,
    prezime_veterinara,
    kontakt_veterinara,
    lokacija_veterinara,
    email_veterinara,
    specijalizacija_veterinara,
  } = req.body;
  if (
    !ime_veterinara ||
    !prezime_veterinara ||
    !kontakt_veterinara ||
    lokacija_veterinara ||
    !email_veterinara ||
    !specijalizacija_veterinara
  )
    return res.status(400).json({ message: "Sva polja su obavezna" });

  const sql =
    "INSERT INTO veterinarians (ime_veterinara, prezime_veterinara, kontakt_veterinara, lokacija_veterinara, email_veterinara, specijalizacija_veterinara) VALUES (?, ?)";
  db.query(
    sql,
    [
      ime_veterinara,
      prezime_veterinara,
      kontakt_veterinara,
      lokacija_veterinara,
      email_veterinara,
      specijalizacija_veterinara,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
          id: result.insertId,
          ime_veterinara,
          prezime_veterinara,
          kontakt_veterinara,
          lokacija_veterinara,
          email_veterinara,
          specijalizacija_veterinara,
        });
    }
  );
});

//Ažuriraj podatke o veterinaru
app.put("/api/veterinarians/:id", (req, res) => {
  const { name, specialization } = req.body;
  if (!name || !specialization)
    return res.status(400).json({ message: "Sva polja su obavezna" });

  const sql =
    "UPDATE veterinarians SET name = ?, specialization = ? WHERE id = ?";
  db.query(sql, [name, specialization, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Veterinar ažuriran" });
  });
});

//Obriši veterinara
app.delete("/api/veterinarians/:id", (req, res) => {
  const sql = "DELETE FROM veterinarians WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Veterinar obrisan" });
  });
});

// API za broj korisnika
app.get("/users/count", (req, res) => {
  connection.query(
    "SELECT COUNT(*) AS count FROM Korisnik",
    (error, results) => {
      if (error) {
        console.error("Greška pri dohvaćanju broja korisnika:", error);
        return res.status(500).send("Greška na serveru");
      }
      res.json({ count: results[0].count });
    }
  );
});

// API za broj aktivnih prijava
app.get("/api/sessions/count", (req, res) => {
  connection.query(
    "SELECT COUNT(*) AS count FROM sessions WHERE is_active = 1",
    (error, results) => {
      if (error) {
        console.error("Greška pri dohvaćanju broja aktivnih prijava:", error);
        return res.status(500).send("Greška na serveru");
      }
      res.json({ count: results[0].count });
    }
  );
});

// API za broj objava
app.get("/api/posts/count", (req, res) => {
  connection.query("SELECT COUNT(*) AS count FROM posts", (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju broja objava:", error);
      return res.status(500).send("Greška na serveru");
    }
    res.json({ count: results[0].count });
  });
});

//---------------LOGIN KORISNIKA I ADMINISTRATORA----------------//
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Molimo unesite korisničko ime i lozinku." });
  }

  // Prvo provjeravamo u tablici Administrator
  const adminQuery = `
    SELECT * FROM Administrator
    WHERE koris_ime_admina = ?
      AND lozinka_admina = ?
  `;

  connection.query(
    adminQuery,
    [username, password],
    (adminError, adminResults) => {
      if (adminError) {
        console.error("Greška pri provjeri administratora:", adminError);
        return res.status(500).json({ message: "Greška na serveru." });
      }

      if (adminResults.length > 0) {
        return res.status(200).json({
          message: "Uspješna prijava!",
          user: { username, role: "admin" },
        });
      }

      // Ako nije administrator, provjeravamo u tablici Korisnik
      const userQuery = `
      SELECT * FROM Korisnik
      WHERE nadimak_korisnika = ?
        AND lozinka_korisnika = ?
    `;

      connection.query(
        userQuery,
        [username, password],
        (userError, userResults) => {
          if (userError) {
            console.error("Greška pri provjeri korisnika:", userError);
            return res.status(500).json({ message: "Greška na serveru." });
          }

          if (userResults.length === 0) {
            return res
              .status(401)
              .json({ message: "Neispravno korisničko ime ili lozinka." });
          }

          // Uspješna prijava korisnika
          res.status(200).json({
            message: "Uspješna prijava!",
            user: { username, role: "user" },
          });
        }
      );
    }
  );
});

//-------------------ODJAVA KORISNIKA IZ SUSTAVA------------------//
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Greška pri odjavi." });
    }
    res.json({ message: "Odjava uspješna." });
  });
});

//-------------------PODACI ZA STR. MOJ RAČUN--------------------//
app.get("/api/moj-racun", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Niste prijavljeni." });
  }

  connection.query(
    "SELECT * FROM Korisnik WHERE SIFRA_KORISNIKA = ?",
    [req.session.user.id],
    (error, results) => {
      if (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
        return res.status(500).json({ message: "Greška na serveru." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Korisnik nije pronađen." });
      }

      res.json(results[0]);
    }
  );
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM Korisnik", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/users", (req, res) => {
  const {
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
    datum_rodenja,
    mjesto_stanovanja,
    adresa_korisnika,
    nadimak_korisnika,
    lozinka_korisnika,
  } = req.body;
  const query =
    "INSERT INTO Korisnik (ime_korisnika, prezime_korisnika, broj_telefona_korisnika, email_korisnika, datum_rodenja, mjesto_stanovanja, adresa_korisnika, nadimak_korisnika, lozinka_korisnika) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      ime_korisnika,
      prezime_korisnika,
      broj_telefona_korisnika,
      email_korisnika,
      datum_rodenja,
      mjesto_stanovanja,
      adresa_korisnika,
      nadimak_korisnika,
      lozinka_korisnika,
    ],
    (err) => {
      if (err) throw err;
      res.send("Korisnik dodan.");
    }
  );
});

// Uredi korisnika
app.put("/api/users/:id", (req, res) => {
  const { SIFRA_KORISNIKA } = req.params;
  const { ime_korisnika, prezime_korisnika, email_korisnika } = req.body;
  const query =
    "UPDATE Korisnik SET ime_korisnika=?, prezime_korisnika=?, email_korisnika=? WHERE SIFRA_KORISNIKA=?";
  connection.query(
    query,
    [ime_korisnika, prezime_korisnika, email_korisnika, SIFRA_KORISNIKA],
    (err) => {
      if (err) throw err;
      res.send("Korisnik ažuriran.");
    }
  );
});

// Obriši korisnika
app.delete("/api/users/:id", (req, res) => {
  connection.query(
    "DELETE FROM Korisnik WHERE SIFRA_KORISNIKA=?",
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.send("Korisnik obrisan.");
    }
  );
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

//----------------REGISTRACIJA KORISNIKA U SUSTAV------------------//
app.post("/api/registracija", (req, res) => {
  const {
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
    datum_rodenja,
    mjesto_stanovanja,
    adresa_korisnika,
    nadimak_korisnika,
    lozinka_korisnika,
  } = req.body;

  // Validate the input data
  if (
    !ime_korisnika ||
    !prezime_korisnika ||
    !broj_telefona_korisnika ||
    !email_korisnika ||
    !datum_rodenja ||
    !mjesto_stanovanja ||
    !adresa_korisnika ||
    !nadimak_korisnika ||
    !lozinka_korisnika
  ) {
    return res.status(400).send("Svi podaci su obavezni.");
  }

  // Insert the user data into the database
  const query =
    "INSERT INTO Korisnik (ime_korisnika, prezime_korisnika, broj_telefona_korisnika, email_korisnika, datum_rodenja, mjesto_stanovanja, adresa_korisnika, nadimak_korisnika, lozinka_korisnika) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      ime_korisnika,
      prezime_korisnika,
      broj_telefona_korisnika,
      email_korisnika,
      datum_rodenja,
      mjesto_stanovanja,
      adresa_korisnika,
      nadimak_korisnika,
      lozinka_korisnika,
    ],
    (error, results) => {
      if (error) {
        console.error("Greška pri unosu korisnika:", error);
        return res.status(500).send("Greška pri unosu korisnika.");
      }

      res.status(200).send("Korisnik uspješno registriran.");
    }
  );
});

/*Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
