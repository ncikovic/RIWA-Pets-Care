<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container">
      <h1 class="text-center">Registracija</h1>
      <p class="text-center">Registrirajte se kako biste dobili pristup našem sistemu.</p>

      <!-- Ime -->
      <q-input
        v-model="form.name"
        label="Ime"
        :rules="[val => val && val.length > 0 || 'Ime je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Email -->
      <q-input
        v-model="form.email"
        label="Email"
        type="email"
        :rules="[
          val => val && val.length > 0 || 'Email je obavezan',
          val => /.+@.+\..+/.test(val) || 'Email nije u ispravnom formatu'
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Korisničko ime -->
      <q-input
        v-model="form.username"
        label="Korisničko ime"
        :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Lozinka -->
      <q-input
        v-model="form.password"
        label="Lozinka"
        type="password"
        :rules="[val => val && val.length >= 6 || 'Lozinka mora imati barem 6 znakova']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Potvrdi -->
      <q-btn label="Potvrdi" color="primary" @click="registerUser" class="full-width-btn" />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    registerUser() {
      // Provjera valjanosti forme
      this.$refs.form.validate().then(success => {
        if (success) {
          // Logika za registraciju
          console.log("Registrirani podaci:", this.form);
          // Ovdje možete dodati funkcionalnost za slanje podataka na server
        } else {
          console.log("Formular nije ispravan");
        }
      });
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
