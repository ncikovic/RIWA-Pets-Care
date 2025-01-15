<template>
  <q-page class="q-pa-md moji-ljubimci">
    <header class="user-header">
      <h2>Moji Ljubimci</h2>
    </header>

    <q-btn color="primary" label="Dodaj ljubimca" @click="openDialog()" class="q-mb-md" />

    <q-card flat bordered v-if="loading">
      <q-card-section>
        <q-spinner color="primary" size="3em" />
        <p>Učitavanje podataka...</p>
      </q-card-section>
    </q-card>

    <div class="pets-container" v-else>
      <q-card v-for="pet in ljubimci" :key="pet.ID_LJUBIMCA" class="pet-card">
        <q-img :src="pet.slika || defaultImage" class="pet-image" />
        <q-card-section>
          <div class="text-subtitle1">{{ pet.ime_ljubimca }}</div>
          <p><strong>Starost:</strong> {{ pet.starost }} godine</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Detalji" color="primary" @click="openDetailsDialog(pet)" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Dijalog s detaljima ljubimca -->
    <q-dialog v-model="detailsDialogOpen">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ selectedPet.ime_ljubimca }}</div>
        </q-card-section>

        <q-card-section>
          <p><strong>Vrsta:</strong> {{ selectedPet.vrsta_ljubimca }}</p>
          <p><strong>Pasmina:</strong> {{ selectedPet.pasmina }}</p>
          <p><strong>Starost:</strong> {{ selectedPet.starost }} godine</p>
          <p><strong>Vlasnik ID:</strong> {{ selectedPet.SIFRA_KORISNIKA }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Zatvori" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ljubimci: [],
      detailsDialogOpen: false,
      selectedPet: {},
      loading: false,
      defaultImage: "https://via.placeholder.com/150",
    };
  },
  methods: {
    async fetchLjubimci() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/moji-ljubimci", { withCredentials: true });
        this.ljubimci = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju ljubimaca:", error);
      } finally {
        this.loading = false;
      }
    },
    openDetailsDialog(pet) {
      this.selectedPet = pet;
      this.detailsDialogOpen = true;
    }
  },
  mounted() {
    this.fetchLjubimci();
  }
};
</script>

<style scoped>
.moji-ljubimci {
  max-width: 1200px;
  margin: auto;
}

.user-header {
  background: linear-gradient(135deg, #6A1B9A, #9C27B0);
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.user-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.pets-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.pet-card {
  width: 250px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-align: center;
}

.pet-image {
  height: 200px;
  object-fit: cover;
}
</style>
