<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- Zadržavamo postojeći logo -->
      <img
        alt="Pets&Care"
        src="~assets/Pets&Care.svg"
        class="logo animate-logo obojaj_logo"
      />

      <!-- Dodajemo naslov i opis -->
      <h1 class="page-title bijela">Welcome to Pets&Care</h1>
      <p class="page-description siva">
        Your one-stop solution for pet care. Explore services, find tips, and
        join our community of pet lovers!
      </p>

      <!-- Dodajemo gumbe za akcije -->
      <div class="actions">
        <q-btn
          label="SAZNAJ VIŠE O NAMA"
          color="primary"
          @click="navigateTo('o_nama')"
          class="action-btn dugme"
        />
        <q-btn
          label="PRIKLJUČI SE NAŠOJ ZAJEDNICI"
          color="secondary"
          outline
          @click="navigateTo('registracijaKorisnika')"
          class="action-btn dugme"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
  name: "IndexPage",
});

const router = useRouter();

// Navigacija prema stranicama
function navigateTo(routeName) {
  router.push(`/${routeName}`);
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 800px; /* Limiting container width */
}

.logo {
  width: 80%; /* Smanjujemo logo na mobilnim uređajima */
  max-width: 400px; /* Maksimalna širina loga */
  height: auto;
  margin-bottom: 30px; /* Povećan razmak ispod loga */
}

/* Animacija za logo */
.animate-logo {
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 1s ease-out forwards;
}

/* Ključne točke animacije */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-title {
  font-size: 2.5rem;
  margin-top: 20px;
  color: #422c50; /* Primarna boja za naslov */
  font-weight: bold;
  letter-spacing: 1px; /* Povećanje razmaka između slova */
}

.page-description {
  font-size: 1.4rem;
  color: #422c50; /* Suptilna siva za opis */
  margin: 10px 0 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column; /* Promjena u kolonu na manjim ekranima */
  justify-content: center;
  gap: 15px;
}

.action-btn {
  min-width: 200px;
  transition: transform 0.3s ease; /* Dodajemo animaciju pri hoveru */
}

.action-btn:hover {
  transform: scale(1.05); /* Lagano povećanje gumba pri hoveru */
}

.q-btn {
  transition: background-color 0.3s ease; /* Animacija za boju gumba */
}

.q-btn:hover {
  background-color: #7e23f5; /* Promjena boje pri hoveru */
  color: white; /* Osiguravamo da tekst bude bijeli prilikom hovera */
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2rem; /* Smanjenje veličine naslova na manjim ekranima */
  }

  .page-description {
    font-size: 1.2rem; /* Smanjenje veličine opisa */
  }

  .actions {
    flex-direction: column; /* Raspored gumba u koloni */
    gap: 10px;
  }

  .q-btn {
    min-width: 180px; /* Manje dugme na manjim ekranima */
  }
}

@media (max-width: 400px) {
  .page-title {
    font-size: 1.8rem; /* Još manje na najmanjim ekranima */
  }

  .page-description {
    font-size: 1rem; /* Smanjenje fonta opisa */
  }
}
</style>
