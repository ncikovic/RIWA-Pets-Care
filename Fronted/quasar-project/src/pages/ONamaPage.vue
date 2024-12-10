<template>
  <q-page padding>
    <div class="content">
      <header>
        <h1 class="text-center bijela">Pets&Care</h1>
      </header>

      <!-- Sekcija sa slikom i uvodom -->
      <section class="section with-image ">
        <div class="text-content">
          <h3 class="section-title bijela">Uvod</h3>
          <p class="siva" v-html="aboutInfo.intro"></p>
        </div>
        <img
          src="~assets/doberman-photo.jpg"
          alt="Pets and Care"
          class="section-image"
        />
      </section>

      <section class="section">
        <h3 class="section-title bijela">Misija</h3>
        <p class="siva">{{ aboutInfo.mission }}</p>
      </section>

      <section class="section">
        <h3 class="section-title bijela">Glavni cilj aplikacije</h3>
        <p class="siva" v-html="aboutInfo.goal"></p>
      </section>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      aboutInfo: {
        intro:
          "Dobrodošli u Pets&Care!<br>Mi smo web aplikacija koja pomaže vlasnicima kućnih ljubimaca da lakše brinu o svojim voljenim prijateljima.",
        mission:
          "Naša misija je olakšati svakodnevni život vlasnicima kućnih ljubimaca pružajući im alate za praćenje zdravlja, prehrane i aktivnosti svojih ljubimaca.",
        goal: "Glavni ciljevi Pets&Care aplikacije su pružiti korisnicima jednostavan i intuitivan način praćenja zdravstvenog stanja svojih ljubimaca, upravljanja njihovom prehranom, te praćenja važnih događaja poput posjeta veterinaru ili redovitih cijepljenja.<br>Osim toga, aplikacija ima za cilj educirati vlasnike o optimalnoj brizi za njihove kućne ljubimce, nudeći relevantne savjete i informacije.<br><br>Kroz implementaciju ovih ciljeva, Pets&Care aplikacija teži postati nepogrešiv partner svakom vlasniku kućnog ljubimca u održavanju zdravlja i sreće njihovih ljubimaca.",
      },
    };
  },
};
</script>

<style scoped>
.content {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  color: #333;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #422c50;
}

.section {
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 10px 0;
}

.with-image {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.section-image {
  flex-shrink: 0;
  width: 45%; /* Slika zauzima manje od polovice širine ekrana */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.text-content {
  flex-grow: 1;
  width: 50%; /* Tekst zauzima polovicu širine ekrana */
  padding-left: 20px;
  text-align: justify;
}

.section-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #374151;
}

p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4b5563;
}

/* Media Queries */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .section {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .section-image {
    width: 100%; /* Slika zauzima punu širinu ekrana na mobilnim uređajima */
  }

  .text-content {
    width: 100%; /* Tekst zauzima punu širinu ekrana na mobilnim uređajima */
    padding-left: 0;
    text-align: center;
  }
}
</style>
