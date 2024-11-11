<template>
  <q-page padding>
    <h1>Registracija</h1>
    <p>Registrirajte se kako biste dobili pristup našem sistemu.</p>
    
    <q-input v-model="form.name" label="Ime" />
    <q-input v-model="form.email" label="Email" type="email" />
    <q-input v-model="form.username" label="Korisničko ime" />
    <q-input v-model="form.password" label="Lozinka" type="password" />
    <q-btn label="Potvrdi" color="primary" @click="registerUser" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        username: '',
        password: ''
      }
    };
  },
  methods: {
    registerUser() {
      // Logika za registraciju
      console.log("Registrirani podaci:", this.form);
    }
  }
};
</script>
