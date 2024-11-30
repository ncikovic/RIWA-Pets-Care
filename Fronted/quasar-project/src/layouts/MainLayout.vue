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

        <q-toolbar-title class="text-h4 main-heading">
          Pets&Care web aplication
        </q-toolbar-title>
        <img class="nav-logo" src="../assets/Pets&Care.svg" @click="returnHome" alt="">
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
/* Postavljanje prilagodljive veličine teksta za cijelu aplikaciju */
html {
  font-size: var(--text-size, 16px);
}
</style>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Početna stranica",
    caption: "Početna",
    icon: "home",
    link: "#/",
  },
  {
    title: "O nama",
    caption: "Saznaj o Pets&Care zajednici!",
    icon: "favourite",
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
    caption: "Nemaš račun?  Registriraj se!",
    icon: "app_registration",
    link: "#/registracijaKorisnika",
  },
  {
    title: "Postavke",
    caption: "Postavke",
    icon: "settings",
    link: "#/postavke",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}



</script>


<script>
export default {
  methods: {
    returnHome() {
      this.$router.push('/')
    }
  }
}
</script>