<template>
  <q-page class="q-pa-md veterinari-page">
    <header class="admin-header">
      <h1>Upravljanje Veterinarima</h1>
      <p>Pregled, dodavanje, uređivanje i brisanje veterinara.</p>
    </header>

    <!-- Tablica veterinara -->
    <q-table
      class="veterinari-table"
      flat bordered
      :rows="veterinari"
      :columns="columns"
      row-key="id"
      loading="loading"
    >
      <template v-slot:top-right>
        <q-btn color="primary" label="Dodaj Veterinara" @click="openDialog()" />
      </template>

      <!-- Akcije (Uredi, Obriši) -->
      <template v-slot:body-cell-akcije="props">
        <q-td :props="props">
          <q-btn icon="edit" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" flat color="red" @click="deleteVeterinar(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Dijalog za uređivanje/dodavanje veterinara -->
    <q-dialog v-model="dialogOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editingVeterinar.id ? "Uredi Veterinara" : "Dodaj Veterinara" }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="editingVeterinar.ime_veterinara" label="Ime" />
          <q-input v-model="editingVeterinar.prezime_veterinara" label="Prezime" />
          <q-input v-model="editingVeterinar.kontakt_veterinara" label="Kontakt" />
          <q-input v-model="editingVeterinar.lokacija_veterinara" label="Lokacija" />
          <q-input v-model="editingVeterinar.email_veterinara" label="Email" />
          <q-input v-model="editingVeterinar.specijalizacija_veterinara" label="Specijalizacija" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="negative" v-close-popup />
          <q-btn flat label="Spremi" color="primary" @click="saveVeterinar" />
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
      veterinari: [],
      dialogOpen: false,
      editingVeterinar: this.getEmptyVeterinar(),
      loading: false,
      columns: [
        { name: "ime_veterinara", label: "Ime", field: "ime_veterinara", align: "left", sortable: true },
        { name: "prezime_veterinara", label: "Prezime", field: "prezime_veterinara", align: "left", sortable: true },
        { name: "kontakt_veterinara", label: "Kontakt", field: "kontakt_veterinara", align: "left" },
        { name: "lokacija_veterinara", label: "Lokacija", field: "lokacija_veterinara", align: "left" },
        { name: "email_veterinara", label: "Email", field: "email_veterinara", align: "left" },
        { name: "specijalizacija_veterinara", label: "Specijalizacija", field: "specijalizacija_veterinara", align: "left" },
        { name: "akcije", label: "Akcije", field: "akcije", align: "center" }
      ]
    };
  },
  methods: {
    async fetchVeterinari() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/veterinar");
        this.veterinari = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju veterinara:", error);
      } finally {
        this.loading = false;
      }
    },
    openDialog(veterinar = null) {
      this.editingVeterinar = veterinar ? { ...veterinar } : this.getEmptyVeterinar();
      this.dialogOpen = true;
    },
    async saveVeterinar() {
      try {
        if (this.editingVeterinar.id) {
          await axios.put(`http://localhost:3000/api/veterinar/${this.editingVeterinar.id}`, this.editingVeterinar);
        } else {
          await axios.post("http://localhost:3000/api/veterinar", this.editingVeterinar);
        }
        this.fetchVeterinari();
        this.dialogOpen = false;
      } catch (error) {
        console.error("Greška pri spremanju veterinara:", error);
      }
    },
    async deleteVeterinar(id) {
      if (!confirm("Jeste li sigurni da želite obrisati ovog veterinara?")) return;
      try {
        await axios.delete(`http://localhost:3000/api/veterinarians/${id}`);
        this.fetchVeterinari();
      } catch (error) {
        console.error("Greška pri brisanju veterinara:", error);
      }
    },
    getEmptyVeterinar() {
      return {
        id: null,
        ime_veterinara: "",
        prezime_veterinara: "",
        kontakt_veterinara: "",
        lokacija_veterinara: "",
        email_veterinara: "",
        specijalizacija_veterinara: ""
      };
    }
  },
  mounted() {
    this.fetchVeterinari();
  }
};
</script>

<style scoped>
.veterinari-page {
  max-width: 1200px;
  margin: auto;
}

.admin-header {
  background: linear-gradient(135deg, #59388e, #59388e);
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.q-table {
  background-color: #59388e;
}

.q-btn {
  margin-right: 8px;
}
</style>
