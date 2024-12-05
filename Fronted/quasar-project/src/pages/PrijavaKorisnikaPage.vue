<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container">
      <h1 class="text-center">Prijava</h1>
      <p class="text-center">Unesite svoje korisničke podatke za prijavu.</p>

      <!-- Korisničko ime -->
      <q-input
        v-model="username"
        label="Korisničko ime"
        :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Lozinka -->
      <q-input
        v-model="password"
        label="Lozinka"
        type="password"
        :rules="[val => val && val.length > 0 || 'Lozinka je obavezna']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Potvrdi -->
      <q-btn label="Potvrdi" color="primary" @click="loginUser" class="full-width-btn" />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      // Provjera da li su uneseni korisničko ime i lozinka
      if (this.username && this.password) {
        // Ako su podaci ispravni, obriši polja i preusmjeri korisnika
        console.log("Podaci za prijavu:", this.username, this.password);

        // Očisti input polja
        this.username = "";
        this.password = "";

        // Preusmjeri korisnika na stranicu Popis Knjiga
        this.$router.push({ name: "PopisKnjigaPage" }); // Pretpostavka je da ruta ima naziv 'PopisKnjigaPage'
      } else {
        alert("Molimo unesite korisničko ime i lozinku.");
      }
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

/* Razmak između inputa */
.q-input {
  width: 100%;
}

/* Dodatni razmak između svakog inputa */
.q-mb-md {
  margin-bottom: 20px;
}
</style>
