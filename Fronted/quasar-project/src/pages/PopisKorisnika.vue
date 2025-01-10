<template>
  <q-page class="user-management-page">
    <q-toolbar class="page-header">
      <q-toolbar-title>Popis korisnika</q-toolbar-title>
      <q-input dense v-model="searchQuery" placeholder="Pretraži korisnike..." outlined clearable>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn label="Dodaj korisnika" icon="person_add" color="primary" @click="openAddUserDialog" />
    </q-toolbar>

    <q-table
      :rows="filteredUsers"
      :columns="columns"
      row-key="id"
      dense
      bordered
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" color="info" dense flat @click="openEditUserDialog(props.row)" />
          <q-btn icon="delete" color="negative" dense flat @click="deleteUser(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Dijalog za dodavanje/uređivanje korisnika -->
    <q-dialog v-model="userDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ editingUser ? "Uredi korisnika" : "Dodaj korisnika" }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="userData.ime_korisnika" label="Ime" outlined dense />
          <q-input v-model="userData.prezime_korisnika" label="Prezime" outlined dense />
          <q-input v-model="userData.broj_telefona_korisnika" label="Broj telefona" outlined dense />
          <q-input v-model="userData.email_korisnika" label="Email" outlined dense />
          <q-input v-model="userData.datum_rodenja" label="Datum rođenja korisnika" outlined dense />
          <q-input v-model="userData.mjesto_stanovanja" label="Mjesto stanovanja" outlined dense />
          <q-input v-model="userData.adresa_korisnika" label="Adresa korisnika" outlined dense />
          <q-input v-model="userData.nadimak_korisnika" label="Korisničko ime" outlined dense />
          <q-input v-model="userData.lozinka_korisnika" label="Lozinka" type="password" outlined dense />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="negative" v-close-popup />
          <q-btn label="Spremi" color="primary" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const users = ref([]);
    const searchQuery = ref("");
    const userDialog = ref(false);
    const editingUser = ref(false);
    const userData = ref({
      SIFRA_KORISNIKA: null,
      ime_korisnika: "",
      prezime_korisnika: "",
      broj_telefona_korisnika: "",
      email_korisnika: "",
      datum_rodenja: "",
      mjesto_stanovanja: "",
      adresa_korisnika: "",
      nadimak_korisnika: "",
      lozinka_korisnika: ""
    });

    // Dohvati korisnike iz baze
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        users.value = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
      }
    };

    // Filtriranje korisnika po pretrazi
    const filteredUsers = computed(() => {
      return users.value.filter((user) =>
        user.nadimak_korisnika.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Otvori dijalog za dodavanje korisnika
    const openAddUserDialog = () => {
      editingUser.value = false;
      userData.value = { SIFRA_KORISNIKA: null, ime_korisnika: "", prezime_korisnika: "", broj_telefona_korisnika: "", email_korisnika: "", datum_rodenja: "", mjesto_stanovanje: "", adresa_korisnika: "", nadimak_korisnika: "", lozinka_korisnika: "" };
      userDialog.value = true;
    };

    // Otvori dijalog za uređivanje korisnika
    const openEditUserDialog = (user) => {
      editingUser.value = true;
      userData.value = { ...user };
      userDialog.value = true;
    };

    // Spremi korisnika (dodaj/uredi)
    const saveUser = async () => {
      try {
        if (editingUser.value) {
          await axios.put(`http://localhost:3000/api/users/${userData.value.SIFRA_KORISNIKA}`, userData.value);
        } else {
          await axios.post("http://localhost:3000/api/users", userData.value);
        }
        userDialog.value = false;
        fetchUsers();
      } catch (error) {
        console.error("Greška pri spremanju korisnika:", error);
      }
    };

    // Obriši korisnika
    const deleteUser = async (id) => {
      if (confirm("Jeste li sigurni da želite obrisati ovog korisnika?")) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${SIFRA_KORISNIKA}`);
          fetchUsers();
        } catch (error) {
          console.error("Greška pri brisanju korisnika:", error);
        }
      }
    };

    onMounted(fetchUsers);

    return {
      users,
      searchQuery,
      filteredUsers,
      userDialog,
      userData,
      editingUser,
      openAddUserDialog,
      openEditUserDialog,
      saveUser,
      deleteUser
    };
  },
  data() {
    return {
      columns: [
        { name: "nadimak_korisnika", label: "Korisničko ime", field: "nadimak_korisnika", align: "left" },
        { name: "ime_korisnika", label: "Ime", field: "ime_korisnika", align: "left" },
        { name: "prezime_korisnika", label: "Prezime", field: "prezime_korisnika", align: "left" },
        { name: "email_korisnika", label: "Email", field: "email_korisnika", align: "left" },
        { name: "actions", label: "Akcije", align: "center" }
      ]
    };
  }
};
</script>

<style scoped>
.user-management-page {
  padding: 20px;
}
.page-header {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}
</style>
