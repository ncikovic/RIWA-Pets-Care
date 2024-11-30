<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- Zadržavamo postojeći logo -->
      <img
        alt="Pets&Care"
        src="~assets/Pets&Care.svg"
        style="width: 400px; height: 400px"
      />

      <!-- Dodajemo naslov i opis -->
      <h1 class="page-title">Welcome to Pets&Care</h1>
      <p class="page-description">
        Your one-stop solution for pet care. Explore services, find tips, and
        join our community of pet lovers!
      </p>

      <!-- Dodajemo gumbe za akcije -->
      <div class="actions">
        <q-btn
          label="SAZNAJ VIŠE O NAMA"
          color="primary"
          @click="navigateTo('o_nama')"
        />
        <q-btn
          label="PRIKLJUČI SE NAŠOJ ZAJEDNICI"
          color="secondary"
          outline
          @click="navigateTo('registracijaKorisnika')"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import routes from "src/router/routes";
import { useRouter } from "vue-router";

defineOptions({
  name: "IndexPage",
});

const router = useRouter();

// Navigacija prema stranicama
function navigateTo(routes) {
  router.push(`/${routes}`);
}
</script>

<style scoped>
.container {
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  margin-top: 20px;
  color: #7e23f5; /* Primarna boja za naslov */
}

.page-description {
  font-size: 1.4rem;
  color: #5118a6; /* Suptilna siva za opis */
  margin: 10px 0 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
