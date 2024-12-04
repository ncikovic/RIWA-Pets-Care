<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 550px">
      <template v-slot:before>
        <div class="q-pa-md">
          <q-date v-model="date" :events="events" event-color="lime green" />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="2024/11/05">
            <div class="text-h4 q-mb-md">2024/11/05</div>
            <p>NAZIV DOGAĐAJA: Veterinarski seminar</p>
            <p>mJESTO DOGAĐAJA: Zagreb, Park Zrinjevac</p>
            <p>OPIS: Seminar o zdravstvenoj zaštiti kućnih ljubimaca.</p>
          </q-tab-panel>

          <q-tab-panel name="2024/11/05">
            <div class="text-h4 q-mb-md">2024/11/05</div>
            <p>NAZIV DOGAĐAJA: Veterinarski seminar</p>
            <p>MJESTO DOGAĐAJA: Zagreb, Park Zrinjevac</p>
            <p>OPIS: Seminar o zdravstvenoj zaštiti kućnih ljubimaca.</p>
          </q-tab-panel>

          <q-tab-panel name="2024/09/30">
            <div class="text-h4 q-mb-md">2024/09/30</div>
            <p>NAZIV DOGAĐAJA: Obuka za vlasnike pasa</p>
            <p>MJESTO DOGAĐAJA: Split, Dioklecijanova palača</p>
            <p>
              OPIS: Interaktivna radionica za bolje razumijevanje ponašanja
              pasa.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/01/28">
            <div class="text-h4 q-mb-md">2025/01/28</div>
            <p>NAZIV DOGAĐAJA: Predavanje o prehrani kućnih ljubimaca</p>
            <p>MJESTO DOGAĐAJA: Rijeka, Korzo</p>
            <p>
              OPIS: Stručnjaci dijele savjete o zdravoj prehrani za kućne
              ljubimce.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/05/05">
            <div class="text-h4 q-mb-md">2025/05/05</div>
            <p>NAZIV DOGAĐAJA: Festival kućnih ljubimaca</p>
            <p>MJESTO DOGAĐAJA: Osijek, Gradski park</p>
            <p>
              OPIS: Dan ispunjen zabavnim aktivnostima za ljubimce i njihove
              vlasnike.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2024/12/16">
            <div class="text-h4 q-mb-md">2024/12/16</div>
            <p>NAZIV DOGAĐAJA: Sajam opreme za kućne ljubimce</p>
            <p>MJESTO DOGAĐAJA: Zagreb, Velesajam</p>
            <p>
              OPIS: Prilika za kupnju najnovije opreme i dodataka za ljubimce.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/03/10">
            <div class="text-h4 q-mb-md">2025/03/10</div>
            <p>NAZIV DOGAĐAJA: Trening spašavanja s psima</p>
            <p>MJESTO DOGAĐAJA: Varaždin, Dravski park</p>
            <p>
              OPIS: Demonstracija i obuka pasa za spašavanje u hitnim
              situacijama.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/06/22">
            <div class="text-h4 q-mb-md">2025/06/22</div>
            <p>NAZIV DOGAĐAJA: Maraton s ljubimcima</p>
            <p>MJESTO DOGAĐAJA: Zadar, Riva</p>
            <p>
              OPIS: Humanitarna utrka s kućnim ljubimcima za pomoć napuštenim
              životinjama.
            </p>
          </q-tab-panel>

          <!-- Događaji za 2024. godinu -->

          <!-- Događaji za 2024/12 -->
          <q-tab-panel name="2024/12/05">
            <div class="text-h4 q-mb-md">2024/12/05</div>
            <p>NAZIV DOGAĐAJA: Pet Fashion Show</p>
            <p>MJESTO DOGAĐAJA: Zagreb, Trg bana Jelačića</p>
            <p>
              OPIS: Prikaz najnovijih modnih trendova za kućne ljubimce,
              uključujući odjeću i dodatke.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2024/12/10">
            <div class="text-h4 q-mb-md">2024/12/10</div>
            <p>NAZIV DOGAĐAJA: Božićna zabava za kućne ljubimce</p>
            <p>MJESTO DOGAĐAJA: Osijek, Gradski park</p>
            <p>
              OPIS: Zabava u kojoj se vlasnici kućnih ljubimaca mogu natjecati u
              raznim disciplinama sa svojim ljubimcima.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2024/12/15">
            <div class="text-h4 q-mb-md">2024/12/15</div>
            <p>NAZIV DOGAĐAJA: Predavanje o očuvanju zdravlja pasa</p>
            <p>MJESTO DOGAĐAJA: Rijeka, Kulturni centar</p>
            <p>
              OPIS: Predavanje stručnjaka o važnosti preventivnih zdravstvenih
              pregleda i pravilne brige za pse.
            </p>
          </q-tab-panel>

          <!-- Događaji za 2025/01 -->
          <q-tab-panel name="2025/01/10">
            <div class="text-h4 q-mb-md">2025/01/10</div>
            <p>NAZIV DOGAĐAJA: Winter Pet Walk</p>
            <p>MJESTO DOGAĐAJA: Pula, Park Verudela</p>
            <p>
              OPIS: Zimska šetnja za kućne ljubimce i njihove vlasnike s nagradama za najljepše obučene ljubimce.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/01/19">
            <div class="text-h4 q-mb-md">2025/01/15</div>
            <p>NAZIV DOGAĐAJA: Zdravlje kućnih ljubimaca – radionica</p>
            <p>MJESTO DOGAĐAJA: Split, Sportska dvorana</p>
            <p>
              OPIS: Radionica o prevenciji bolesti i pravilnoj prehrani kućnih
              ljubimaca.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/01/20">
            <div class="text-h4 q-mb-md">2025/01/20</div>
            <p>NAZIV DOGAĐAJA: Psi na ledu - natjecanje</p>
            <p>MJESTO DOGAĐAJA: Zadar, Zimski kompleks</p>
            <p>OPIS: Natjecanje pasa u sportskim disciplinama na ledu.</p>
          </q-tab-panel>

          <!-- Događaji za 2025/02 -->
          <q-tab-panel name="2025/02/03">
            <div class="text-h4 q-mb-md">2025/02/05</div>
            <p>NAZIV DOGAĐAJA: Izložba pasa i mačaka</p>
            <p>MJESTO DOGAĐAJA: Varaždin, Sajamski centar</p>
            <p>
              OPIS: Izložba različitih pasmina pasa i mačaka, natjecanje u
              ljepoti i poslušnosti.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/02/10">
            <div class="text-h4 q-mb-md">2025/02/10</div>
            <p>NAZIV DOGAĐAJA: Trening za spašavanje mačaka</p>
            <p>MJESTO DOGAĐAJA: Osijek, Gradski centar</p>
            <p>
              OPIS: Obuka za treniranje mačaka za hitne situacije i
              intervencije.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/02/15">
            <div class="text-h4 q-mb-md">2025/02/15</div>
            <p>NAZIV DOGAĐAJA: Pet Care Fair</p>
            <p>MJESTO DOGAĐAJA: Split, Sportska dvorana</p>
            <p>OPIS: Sajam i radionica o zdravlju i njezi kućnih ljubimaca.</p>
          </q-tab-panel>

          <!-- Događaji za 2025/03 -->
          <q-tab-panel name="2025/03/05">
            <div class="text-h4 q-mb-md">2025/03/05</div>
            <p>NAZIV DOGAĐAJA: Dan zaštite kućnih ljubimaca</p>
            <p>MJESTO DOGAĐAJA: Rijeka, Gradska vijećnica</p>
            <p>
              OPIS: Predavanja i panel diskusije o zaštiti kućnih ljubimaca i
              zakonodavstvu.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/03/10">
            <div class="text-h4 q-mb-md">2025/03/10</div>
            <p>NAZIV DOGAĐAJA: Pet Yoga za ljubimce</p>
            <p>MJESTO DOGAĐAJA: Zadar, Gradski park</p>
            <p>
              OPIS: Radionica joge za kućne ljubimce i njihove vlasnike s ciljem
              poboljšanja zdravlja.
            </p>
          </q-tab-panel>

          <q-tab-panel name="2025/03/15">
            <div class="text-h4 q-mb-md">2025/03/15</div>
            <p>NAZIV DOGAĐAJA: Pet Photography Workshop</p>
            <p>MJESTO DOGAĐAJA: Pula, Kreativni studio</p>
            <p>
              OPIS: Radionica fotografije za kućne ljubimce, savjeti za
              stvaranje savršenih portreta.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      splitterModel: ref(50),
      date: ref("2024/11/05"),
      events: [
        "2024/11/05",
        "2024/09/30",
        "2025/01/28",
        "2025/05/05",
        "2024/12/16",
        "2025/03/10",
        "2025/06/22",
        "2024/12/05",
        "2024/12/10",
        "2024/12/15",
        "2025/01/10",
        "2025/01/19",
        "2025/01/20",
        "2025/02/03",
        "2025/02/10",
        "2025/02/15",
        "2025/03/05",
        "2025/03/15",
      ],
    };
  },
};
</script>
