<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container pozadina_crna">
      <h1 class="text-center bijela">Registracija</h1>
      <p class="text-center">
        Registrirajte se kako biste dobili pristup našem sistemu.
      </p>

      <!-- Ime -->
      <q-input
        v-model="form.ime_korisnika"
        label="Ime korisnika"
        :rules="[(val) => (val && val.length > 0) || 'Ime je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Prezime -->
      <q-input
        v-model="form.prezime_korisnika"
        label="Prezime korisnika"
        :rules="[(val) => (val && val.length > 0) || 'Ime je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <q-input
        v-model="form.broj_telefona_korisnika"
        label="Broj telefona korisnika"
        type="tel"
        :rules="[
          (val) => (val && val.length > 0) || 'Broj telefona je obavezan',
          (val) =>
            /^\d+$/.test(val) || 'Broj telefona mora sadržavati samo brojeve',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Email -->
      <q-input
        v-model="form.email_korisnika"
        label="Email korisnika"
        type="email"
        :rules="[
          (val) => (val && val.length > 0) || 'Email je obavezan',
          (val) => /.+@.+\..+/.test(val) || 'Email nije u ispravnom formatu',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Datum rođenja -->
      <q-input
        v-model="form.datum_rodenja"
        label="Datum rođenja korisnika"
        mask="####-##-##"
        :rules="[
          (val) => !!val || 'Datum rođenja je obavezan',
          (val) =>
            /^\d{4}-\d{2}-\d{2}$/.test(val) || 'Format mora biti YYYY-MM-DD',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Mjesto stanovanja -->
      <q-select
        v-model="form.mjesto_stanovanja"
        label="Mjesto stanovanja"
        :options="cities"
        :rules="[(val) => !!val || 'Mjesto stanovanja je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Adresa stanovanja -->
      <q-input
        v-model="form.adresa_korisnika"
        label="Adresa stanovanja"
        :rules="[(val) => (val && val.length > 0) || 'Adresa je obavezna']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Korisničko ime -->
      <q-input
        v-model="form.nadimak_korisnika"
        label="Korisničko ime"
        :rules="[
          (val) => (val && val.length > 0) || 'Korisničko ime je obavezno',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Lozinka -->
      <q-input
        v-model="form.lozinka_korisnika"
        label="Lozinka"
        type="password"
        :rules="[
          (val) =>
            (val && val.length >= 6) || 'Lozinka mora imati barem 6 znakova',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Potvrdi -->
      <q-btn
        label="Potvrdi"
        color="primary"
        @click="userRegistration"
        class="full-width-btn"
      />
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        ime_korisnika: "",
        prezime_korisnika: "",
        broj_telefona_korisnika: "",
        email_korisnika: "",
        datum_rodenja: "",
        mjesto_stanovanja: "",
        adresa_korisnika: "",
        nadimak_korisnika: "",
        lozinka_korisnika: "",
      },
      cities: [
        "Zagreb",
        "Split",
        "Rijeka",
        "Osijek",
        "Zadar",
        "Slavonski Brod",
        "Pula",
        "Karlovac",
        "Varaždin",
        "Šibenik",
        "Dubrovnik",
        "Sisak",
        "Bjelovar",
        "Kaštela",
        "Vinkovci",
        "Koprivnica",
        "Đakovo",
        "Požega",
        "Zaprešić",
        "Samobor",
        "Vukovar",
        "Čakovec",
        "Trogir",
        "Petrinja",
        "Križevci",
      ],
    };
  },
  methods: {
    async userRegistration() {
      // Provjera valjanosti forme
      if (this.isFormValid()) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/registracija",
            this.form
          );
          console.log("Registracija uspješna:", response.data);
          alert("Registracija je uspješno izvršena!");
        } catch (error) {
          console.error("Greška pri registraciji:", error);
          alert("Došlo je do greške pri registraciji.");
        }
      } else {
        alert("Molimo popunite sva obavezna polja.");
      }
    },
    isFormValid() {
      // Provjera da li su svi podaci uneseni
      return (
        this.form.ime_korisnika &&
        this.form.prezime_korisnika &&
        this.form.broj_telefona_korisnika &&
        this.form.email_korisnika &&
        this.form.datum_rodenja &&
        this.form.mjesto_stanovanja &&
        this.form.adresa_korisnika &&
        this.form.nadimak_korisnika &&
        this.form.lozinka_korisnika &&
        this.form.lozinka_korisnika.length >= 6
      );
    },
  },
};
</script>

<style scoped>
/* Kontejner za formu centriran na ekranu */
.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

/* Naslov */
h1 {
  font-size: 2.5rem;
  color: #422c50;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Podnaslov */
p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
}

/* Stil za gumb */
.q-btn {
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px 0;
}

/* Poboljšanje za hover efekt na gumbu */
.q-btn:hover {
  background-color: #6619d2;
  transform: scale(1.05);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* Razmak između input polja */
.q-input {
  width: 100%;
}

/* Dodatni razmak između svakog inputa */
.q-mb-md {
  margin-bottom: 20px;
}
</style>
