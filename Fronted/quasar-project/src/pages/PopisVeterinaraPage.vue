<template>
  <q-page padding>
    <h1 class="text-center">Popis Veterinara</h1>
    <p class="text-center">
      Ovdje možete pronaći popis svih veterinara koji su dostupni u našem
      sustavu.
    </p>

    <!-- Tražilica za veterinare -->
    <q-input
      v-model="searchQuery"
      label="Pretraži veterinare"
      placeholder="Upišite ime, prezime ili specijalizaciju za životinje"
      debounce="300"
      class="q-mb-md"
      outlined
    />

    <q-table
      :rows="filteredVeterinari"
      :columns="columns"
      row-key="email_veterinara"
      class="q-my-md"
    />
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const searchQuery = ref("");
    const veterinari = ref([]);

    const columns = [
      { name: "ime_veterinara", label: "Ime", field: "ime_veterinara", align: "left" },
      { name: "prezime_veterinara", label: "Prezime", field: "prezime_veterinara", align: "left" },
      { name: "lokacija_veterinara", label: "Lokacija", field: "lokacija_veterinara", align: "left" },
      { name: "email_veterinara", label: "Kontakt (E-mail)", field: "email_veterinara", align: "left" },
      { name: "kontakt_veterinara", label: "Kontakt (Telefon)", field: "kontakt_veterinara", align: "left" },
      { name: "specijalizacija_veterinara", label: "Specijalizacija za", field: "specijalizacija_veterinara", align: "left" },
    ];

    // Filtriranje podataka na temelju pretraživanja
    const filteredVeterinari = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return veterinari.value.filter((vet) => {
        return (
          vet.ime_veterinara.toLowerCase().includes(query) ||
          vet.prezime_veterinara.toLowerCase().includes(query) ||
          vet.specijalizacija_veterinara.toLowerCase().includes(query)
        );
      });
    });

    // Dohvat podataka iz baze
    const loadVeterinari = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/veterinari");
        veterinari.value = response.data || [];
      } catch (error) {
        console.error("Greška pri učitavanju veterinara:", error);
      }
    };

    onMounted(() => {
      loadVeterinari();
    });

    return {
      searchQuery,
      veterinari,
      columns,
      filteredVeterinari,
    };
  },
};
</script>

<style scoped>
/* Naslov */
h1 {
  font-size: 2.5rem;
  color: #422c50;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Podnaslov */
p {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

/* Stil za tablicu */
.q-table {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Omogućava pomicanje tablice na manjim ekranima */
}

/* Stil za naslov tablice */
.q-table th {
  background-color: #8537cf;
  color: #fff;
  padding: 12px;
  font-weight: bold;
  text-align: left;
}

/* Stil za ćelije tablice */
.q-table td {
  padding: 12px;
  color: #7bc1c6;
  font-size: 1rem;
}

/* Razmak između tablice i drugih elemenata */
.q-my-md {
  margin-top: 40px;
  margin-bottom: 40px;
}

/* Centriranje teksta */
.text-center {
  text-align: center;
}

/* Responsivni dizajn za manje ekrane */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }

  .q-table th,
  .q-table td {
    padding: 8px;
  }

  .q-my-md {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
