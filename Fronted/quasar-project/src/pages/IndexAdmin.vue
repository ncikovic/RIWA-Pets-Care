<template>
  <q-page class="q-pa-md admin-page">
    <!-- Custom Header -->
    <header class="admin-header">
      <h1>Dobrodošli u Admin Panel</h1>
      <p>Upravljajte korisnicima, podacima i aplikacijom jednostavno i efikasno.</p>
    </header>

    <div class="content-container">
      <!-- Lijevi blok s karticama -->
      <div class="left-section">
        <q-card class="admin-card">
          <q-card-section>
            <div class="text-h6">Broj korisnika</div>
            <p>Ukupno registriranih: {{ userCount }}</p>
          </q-card-section>
        </q-card>

        <q-card class="admin-card">
          <q-card-section>
            <div class="text-h6">Aktivne prijave</div>
            <p>Trenutno prijavljenih: {{ activeSessions }}</p>
          </q-card-section>
        </q-card>
      </div>

      <!-- Desni blok s dodatnim tekstom -->
      <div class="right-section">
        <q-card class="info-card">
          <q-card-section>
            <h3>Informacije o sustavu</h3>
            <p>Ovdje možete upravljati korisnicima, pregledavati prijave i pratiti statistiku aplikacije.</p>
            <p>Redovito ažurirajte podatke kako biste osigurali optimalno funkcioniranje sustava.</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userCount: 0,
      activeSessions: 0,
      postCount: 0,
    };
  },
  async mounted() {
    try {
      const userResponse = await axios.get("http://localhost:3000/users/count");
      this.userCount = userResponse.data.count;

      const sessionResponse = await axios.get("http://localhost:3000/api/sessions/count");
      this.activeSessions = sessionResponse.data.count;
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
      if (error.response) {
        // Server je odgovorio, ali je došlo do greške u odgovoru
        console.error("Greška u odgovoru:", error.response.data);
      } else if (error.request) {
        // Nema odgovora od servera
        console.error("Nema odgovora od servera:", error.request);
      } else {
        // Drugi problemi s zahtjevom
        console.error("Greška u konfiguraciji zahtjeva:", error.message);
      }
    }
  },
};
</script>

<style scoped>
/* Custom Header */
.admin-header {
  background: linear-gradient(135deg, #8be8ff, #7e38e0);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.admin-header h1 {
  font-size: 2rem;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 5px;
}

.admin-header p {
  font-size: 1.2rem;
  font-family: 'Times New Roman', Times, serif;
  opacity: 0.8;
  font-family: 'Times New Roman', Times, serif;
}

/* Glavni layout */
.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  font-family: 'Times New Roman', Times, serif;
}

/* Lijeva sekcija s karticama */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  max-width: 400px;
  font-family: 'Times New Roman', Times, serif;
}

/* Stil kartica */
.admin-card {
  padding: 20px;
  background-color: #673AB7;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Times New Roman', Times, serif;
}

/* Desna sekcija s informacijama */
.right-section {
  flex: 2;
}

/* Informativna kartica */
.info-card {
  padding: 20px;
  background-color: #EDE7F6;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  color: #4A148C;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.info-card p {
  color: #333;
  font-size: 1rem;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
