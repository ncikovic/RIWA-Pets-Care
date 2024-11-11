<template>
  <q-page padding>
    <div class="content">
      <header>
        <h1 class="title text-primary">Pets&Care</h1>
        <h2 class="subtitle">O nama</h2>
      </header>

      <section class="section">
        <h3 class="section-title">Uvod</h3>
        <!-- Koristimo v-html kako bi prikazali <br> oznaku za prijelom linije -->
        <p v-html="aboutInfo.intro"></p>
      </section>

      <section class="section">
        <h3 class="section-title">Misija</h3>
        <p>{{ aboutInfo.mission }}</p>
      </section>

      <section class="section">
        <h3 class="section-title">Glavni cilj aplikacije</h3>
        <p v-html="aboutInfo.goal"></p>
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

<style lang="sass" scoped>
.content
  max-width: 800px
  margin: 0 auto
  text-align: left
  color: #333

.title
  font-size: 2.5rem
  margin-bottom: 0.5em

.subtitle
  font-size: 1.5rem
  margin-bottom: 1.5em
  color: #666

.section
  margin-bottom: 1.5em

.section-title
  font-size: 1.3rem
  margin-bottom: 0.5em
  color: #444

p
  font-size: 1.1rem
  line-height: 1.6
</style>
