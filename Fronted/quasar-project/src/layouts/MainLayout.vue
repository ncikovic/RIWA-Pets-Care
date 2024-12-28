<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h3">
          Pets&Care web application
        </q-toolbar-title>

        <!-- Logo aplikacije s navigacijom na početnu stranicu -->
        <img
          class="nav-logo"
          src="../assets/Pets&Care.svg"
          @click="returnHome"
          alt="Pets&Care logo"
        />

        <!-- Avatar korisnika s drop-down menijem -->
        <q-btn
          flat
          round
          dense
          icon="account_circle"
          aria-label="Profile"
          ref="menuButton"
          @click="menu = !menu"
        />
        <q-menu
          v-model="menu"
          anchor="bottom right"
          self="top right"
          :target="$refs.menuButton"
        >
          <q-list>
            <q-item clickable @click="navigateTo('/moj-racun')">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Moj račun</q-item-section>
            </q-item>
            <q-item clickable @click="navigateTo('/moji-ljubimci')">
              <q-item-section avatar>
                <q-icon name="pets" />
              </q-item-section>
              <q-item-section>Moji ljubimci</q-item-section>
            </q-item>
            <q-item clickable @click="navigateTo('/postavke')">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Postavke</q-item-section>
            </q-item>
            <q-item clickable @click="toggleLoginLogout">
              <q-item-section avatar>
                <q-icon :name="isLoggedIn ? 'logout' : 'login'" />
              </q-item-section>
              <q-item-section>{{
                isLoggedIn ? "Odjava" : "Prijava"
              }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-toolbar>
    </q-header>

    <!-- LIJEVI IZBORNIK (Drawer) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- STRANICE APLIKACIJE -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

// Lista linkova za lijevi izbornik
const linksList = [
  { title: "Početna stranica", caption: "Početna", icon: "home", link: "#/" },
  {
    title: "O nama",
    caption: "Saznaj o Pets&Care zajednici!",
    icon: "pets",
    link: "#/o_nama",
  },
  {
    title: "Događaji",
    caption: "Pretraži nadolazeće događaje.",
    icon: "event",
    link: "#/dogadaji",
  },
  {
    title: "Popis veterinara",
    caption: "Tražiš li veterinara?",
    icon: "search",
    link: "#/popisVeterinara",
  },
  {
    title: "Prijava korisnika",
    caption: "Prijavi se u svoj račun!",
    icon: "login",
    link: "#/prijavaKorisnika",
  },
  {
    title: "Registracija korisnika",
    caption: "Nemaš račun? Registriraj se!",
    icon: "app_registration",
    link: "#/registracijaKorisnika",
  },
];

// Kontrola otvaranja lijevog izbornika (drawer)
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Drop-down meni
const menu = ref(false);

// Stanje korisničke prijave
const isLoggedIn = ref(false);

// Navigacija na odabrane stranice
function navigateTo(page) {
  menu.value = false;
  console.log(`Navigacija na: ${page}`);
  // Ovo možete zamijeniti sa stvarnom navigacijom, npr.:
  // this.$router.push({ name: page });
}

// Login/Logout akcija
function toggleLoginLogout() {
  isLoggedIn.value = !isLoggedIn.value;
  console.log(isLoggedIn.value ? "Korisnik prijavljen" : "Korisnik odjavljen");
  menu.value = false;
}

// Navigacija na početnu stranicu
function returnHome() {
  window.location.href = "/";
}
</script>

<style scoped>
/* Stil za logo */
.nav-logo {
  width: 80px;
  cursor: pointer;
  margin-right: auto;
}

/* Drop-down menu ikona (avatar) */
.q-toolbar .q-btn {
  margin-left: auto;
}
</style>
