<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-center-h1 custom-title">
          Admin Panel
        </q-toolbar-title>
        <div>Dobrodošli, ADMINE!</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Administratorske Stranice </q-item-label>

        <!-- Administratorske stranice -->
        <q-item
          v-for="link in adminLinks"
          :key="link.title"
          clickable
          @click="navigateTo(link.link)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

defineOptions({
  name: "AdminLayout",
});

// State and Vuex integration
const leftDrawerOpen = ref(false);
const router = useRouter();
const store = useStore();

const admin = computed(() => store.getters.getAdmin); // Dohvat admin podataka iz Vuex-a

// Administratorske opcije
const adminLinks = [
  {
    title: "Dashboard",
    caption: "Pregled administracije",
    icon: "dashboard",
    link: "/admin",
  },
  {
    title: "Korisnici",
    caption: "Upravljanje korisnicima",
    icon: "people",
    link: "/admin/popisKorisnika",
  },
  {
    title: "Veterinari",
    caption: "Upravljanje veterinarima",
    icon: "people",
    link: "/admin/popisVeterinara",
  },
  {
    title: "Postavke",
    caption: "Administratorske postavke",
    icon: "settings",
    link: "/admin/Postavke",
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(route) {
  router.push(route);
}
</script>

<style scoped>
/* Glavni stil za naslov */
.custom-title {
  font-weight: bold;
  font-size: 2.5em;
  font-family: 'Times New Roman', Times, serif;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Zaglavlje */
.custom-header {
  background: linear-gradient(135deg, #4ac6e2, #5f00cc);
  color: white;
  font-family: 'Times New Roman', Times, serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Gumb za otvaranje izbornika */
.q-btn {
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;
}

.q-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Navigacijski drawer */
.q-drawer {
  background: #1e1e2f;
  color: #ffffff;
}

.q-list {
  padding: 10px;
  font-family: 'Times New Roman', Times, serif;
}

/* Stavke u meniju */
.q-item {
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
}

.q-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

/* Ikone u navigaciji */
.q-item-section avatar {
  color: #f5f5f5;
}

/* Aktivni link */
.q-item--active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ff9800;
}

/* Sadržaj stranice */
.q-page-container {
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
}

/* Tekst za dobrodošlicu */
.q-toolbar div {
  font-size: 1.2em;
  font-weight: bold;
  margin-left: auto;
  color: #ffffff;
}
</style>
