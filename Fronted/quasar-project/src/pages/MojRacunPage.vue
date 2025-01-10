<template>
  <q-page class="user-profile-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <!-- HEADER PROFILA -->
    <div class="user-profile-header" :class="{ 'info-card-dark': $q.dark.isActive, 'info-card-light': !$q.dark.isActive }">
      <img :src="profileImage || '/path/to/default-profile.png'" alt="Profilna slika" class="user-profile-image" />
      <h2>{{ userData.nadimak_korisnika || "Nepoznati korisnik" }}</h2>
      <p>{{ userData.ime_korisnika || "Ime" }} {{ userData.prezime_korisnika || "Prezime" }}</p>
      <p>{{ userData.email_korisnika || "Email nije dostupan" }}</p>
    </div>

    <hr class="divider" />

    <!-- GALERIJA SLIKA -->
    <div class="user-images-section">
      <div v-if="userImages.length" class="images-grid">
        <img
          v-for="(image, index) in userImages"
          :key="index"
          :src="image.UserImageLink || '/path/to/default-image.jpg'"
          alt="Korisnička slika"
          class="user-image"
          @click="expandImage(image)"
        />
      </div>
      <div v-else class="no-images">
        <p>Trenutno nema dostupnih slika.</p>
      </div>
    </div>

    <!-- MODAL ZA PRIKAZ POVEĆANE SLIKE -->
    <div v-if="expandedImage" class="image-modal" @click.self="closeModal">
      <div class="image-modal-card" :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }">
        <img :src="expandedImage.UserImageLink" alt="Povećana slika" class="expanded-image" />
        <div class="image-modal-footer">
          <p>{{ expandedImage.UserImageDescription || "Nema opisa slike." }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const userId = route.params.userId;
    const userData = ref({});
    const userImages = ref([]);
    const profileImage = ref("");
    const expandedImage = ref(null);

    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(`${process.env.API_URL}/api/users/${userId}`);
        userData.value = userResponse.data || {};
        await fetchProfileImage();
        const imagesResponse = await axios.get(`${process.env.API_URL}/api/userimages/user/${userId}`);
        userImages.value = Array.isArray(imagesResponse.data) ? imagesResponse.data : [];
      } catch (error) {
        console.error("Greška pri učitavanju profila:", error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const profileResponse = await axios.get(`${process.env.API_URL}/api/userProfileImages/${userId}`);
        profileImage.value = profileResponse.data?.[0]?.UserProfileImageLink || "/path/to/default-profile.png";
      } catch (error) {
        console.error("Greška pri učitavanju profilne slike:", error);
      }
    };

    const expandImage = (image) => {
      expandedImage.value = image;
    };

    const closeModal = () => {
      expandedImage.value = null;
    };

    onMounted(fetchUserProfile);

    return { userData, userImages, profileImage, expandedImage, expandImage, closeModal };
  },
};
</script>

<style scoped>
/* Glavna stilizacija */
.user-profile-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* HEADER PROFILA */
.user-profile-header {
  text-align: center;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  margin-bottom: 20px;
}

.user-profile-header h2 {
  font-size: 1.8rem;
  margin: 10px 0;
}

.user-profile-header p {
  font-size: 1.1rem;
  color: #666;
}

.user-profile-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #2a8db3;
  transition: transform 0.3s ease-in-out;
}

.user-profile-image:hover {
  transform: scale(1.1);
}

/* DIVIDER */
.divider {
  width: 100%;
  border: none;
  border-top: 2px solid #ddd;
  margin: 20px 0;
}

/* GALERIJA SLIKA */
.user-images-section {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  justify-content: center;
}

.user-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.user-image:hover {
  transform: scale(1.1);
}

/* MODAL ZA POVEĆANE SLIKE */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.image-modal-card {
  width: 90vw;
  max-width: 500px;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}

.expanded-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.image-modal-footer {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
}

/* TEMA - TAMNI I SVJETLI MOD */
.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.info-card-dark {
  background: rgb(24, 24, 24);
  color: white;
}

.info-card-light {
  background: white;
  color: black;
}

.content-card-light {
  background-color: white;
  color: black;
}

.content-card-dark {
  background-color: black;
  color: white;
}

/* RESPONSIVNOST */
@media screen and (max-width: 768px) {
  .user-profile-header {
    padding: 20px;
    max-width: 90%;
  }

  .images-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }

  .user-image {
    height: 100px;
  }

  .expanded-image {
    height: 250px;
  }
}
</style>
