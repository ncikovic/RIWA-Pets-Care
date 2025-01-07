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
    link: "/admin/dashboard",
  },
  {
    title: "Korisnici",
    caption: "Upravljanje korisnicima",
    icon: "people",
    link: "/admin/korisnici",
  },
  {
    title: "Postavke",
    caption: "Administratorske postavke",
    icon: "settings",
    link: "/admin/postavke",
  },
  {
    title: "Izvješća",
    caption: "Pogledaj izvješća",
    icon: "bar_chart",
    link: "/admin/izvjesca",
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
.custom-title {
  font-weight: bold;
  font-size: 2.5em;
  text-transform: uppercase;
  color: #ffffff;
}
.custom-header {
  background-color: #5eade5;
  color: white;
}
.q-btn {
  color: rgb(163, 235, 253);
}
</style>
