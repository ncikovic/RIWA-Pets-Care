<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- Zadržavamo postojeći logo -->
      <img
        alt="Pets&Care"
        src="~assets/Pets&Care.svg"
        @click="navigateTo('o_nama')"
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
          label="Tražiš čuvalicu za svog ljubimca?"
          color="primary"
          @click="openLink('https://www.siterice.hr/cuvanje-i-briga-o-kucnim-ljubimcima')"
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

    <!-- FOOTER s brendovima -->
    <q-footer class="footer">
      <div class="footer-content">
        <p class="footer-text">
          © {{ new Date().getFullYear() }} Pets&Care - Sva prava pridržana.
        </p>
        <div class="brand-logos">
          <a
            v-for="brand in brands"
            :key="brand.name"
            :href="brand.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="brand.logo" :alt="brand.name" class="brand-logo" />
          </a>
        </div>
      </div>
    </q-footer>
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
function openLink(url) {
  window.open(url, "_blank"); // Otvara link u novom tabu
}

// Podaci za logotipe brendova
const brands = [
  {
    name: "Farmina",
    logo: "https://1000logos.net/wp-content/uploads/2023/10/Farmina-Logo.png",
    link: "https://www.farmina.com/",
  },
  {
    name: "Brit",
    logo: "https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/16235046/Brit-Logo-500x281-1.png",
    link: "https://www.brit-petfood.com/",
  },
  {
    name: "Pet Centar",
    logo: "https://martipark.hr/wp-content/uploads/2020/09/a37bae83-1873-4c87-8b8a-fc6e20177b63.png",
    link: "https://www.pet-centar.hr/",
  },
  {
    name: "Royal Canin",
    logo: "https://1000logos.net/wp-content/uploads/2020/07/Royal-Canin-Logo.png",
    link: "https://www.royalcanin.com/",
  },
  {
    name: "COCO'S Pet Store",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyh2wrOnTY015wo7EjoabK7SoCQqB3--KSiA&s",
    link: "https://cocos-petstore.com/",
  },
];
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
}

.logo {
  width: 80%;
  max-width: 400px;
  height: auto;
  margin-bottom: 30px;
}

/* Animacija za logo */
.animate-logo {
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 1s ease-out forwards;
}

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
  color: #422c50;
  font-weight: bold;
  letter-spacing: 1px;
}

.page-description {
  font-size: 1.4rem;
  color: #422c50;
  margin: 10px 0 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.action-btn {
  min-width: 200px;
  transition: transform 0.3s ease;
}

.action-btn:hover {
  transform: scale(1.05);
}

.q-btn {
  transition: background-color 0.3s ease;
}

.q-btn:hover {
  background-color: #7e23f5;
  color: white;
}

/* FOOTER STILOVI */
.footer {
  background: linear-gradient(135deg, #7e38e0, #8be8ff);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-text {
  font-size: 16px;
  margin-bottom: 15px;
}

/* Logotipi brendova */
.brand-logos {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.brand-logo {
  height: 50px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* Responsivni dizajn */
@media (max-width: 600px) {
  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1.2rem;
  }

  .actions {
    flex-direction: column;
    gap: 10px;
  }

  .q-btn {
    min-width: 180px;
  }
}

@media (max-width: 400px) {
  .page-title {
    font-size: 1.8rem;
  }

  .page-description {
    font-size: 1rem;
  }
}
</style>
