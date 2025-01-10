<template>
  <q-page class="q-pa-md settings-page">
    <!-- Header -->
    <header class="settings-header">
      <h1>Postavke sustava</h1>
      <p>Uredite osnovne i napredne postavke sustava.</p>
    </header>

    <div class="settings-container">
      <!-- Lijevi panel: Jednostavne postavke -->
      <div class="settings-section">
        <h2>Jednostavne postavke</h2>

        <q-toggle v-model="maintenanceMode" label="Način održavanja" />
        <q-toggle v-model="userRegistration" label="Omogući registraciju korisnika" />
        <q-toggle v-model="emailNotifications" label="Omogući email obavijesti" />

        <q-btn label="Spremi promjene" color="primary" @click="saveSimpleSettings" />
      </div>

      <!-- Desni panel: Napredne postavke -->
      <div class="settings-section advanced">
        <h2>Napredne postavke</h2>

        <q-input v-model="apiKey" label="API ključ" outlined />
        <q-input v-model="sessionTimeout" type="number" label="Vrijeme trajanja sesije (min)" outlined />

        <q-btn label="Spremi napredne postavke" color="secondary" @click="saveAdvancedSettings" />
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      maintenanceMode: false,
      userRegistration: true,
      emailNotifications: true,
      apiKey: "",
      sessionTimeout: 60,
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/api/settings");
      const settings = response.data;

      this.maintenanceMode = settings.maintenanceMode;
      this.userRegistration = settings.userRegistration;
      this.emailNotifications = settings.emailNotifications;
      this.apiKey = settings.apiKey;
      this.sessionTimeout = settings.sessionTimeout;
    } catch (error) {
      console.error("Greška pri dohvaćanju postavki:", error);
    }
  },
  methods: {
    async saveSimpleSettings() {
      try {
        await axios.put("http://localhost:3000/api/settings/simple", {
          maintenanceMode: this.maintenanceMode,
          userRegistration: this.userRegistration,
          emailNotifications: this.emailNotifications,
        });
        alert("Jednostavne postavke spremljene!");
      } catch (error) {
        console.error("Greška pri spremanju:", error);
      }
    },
    async saveAdvancedSettings() {
      try {
        await axios.put("http://localhost:3000/api/settings/advanced", {
          apiKey: this.apiKey,
          sessionTimeout: this.sessionTimeout,
        });
        alert("Napredne postavke spremljene!");
      } catch (error) {
        console.error("Greška pri spremanju:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Stil za header */
.settings-header {
  text-align: center;
  background: #512DA8;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.settings-header h1 {
  font-size: 2rem;
}

.settings-header p {
  opacity: 0.8;
  font-size: 1.1rem;
}

/* Glavni kontejner */
.settings-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* Sekcija postavki */
.settings-section {
  background: #F3E5F5;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Napredne postavke s tamnijom pozadinom */
.advanced {
  background: #D1C4E9;
}

/* Stil za tipke */
.q-btn {
  margin-top: 15px;
  width: 100%;
}
</style>
